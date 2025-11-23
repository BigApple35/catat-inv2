import { useEffect, useRef, useState } from "react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardFooter,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Separator } from "@/components/ui/separator";
import { Trash2, Edit, Plus, Check } from "lucide-react";
import { getTodos, createTodo, updateTodo, deleteTodo } from "@/api/todolist";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogFooter,
  DialogTitle,
  DialogClose,
  DialogDescription,
} from "@/components/ui/dialog";

type Task = {
  id: string;
  text: string;
  completed: boolean;
  createdAt: number;
  task_date?: string; // due date (YYYY-MM-DD)
  priority?: "low" | "medium" | "high"; // <-- new
};

export default function ToDoList() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [search, setSearch] = useState<string>(""); // search term for filtering tasks
  const [text, setText] = useState("");
  const [dueDate, setDueDate] = useState<string>(""); // add-dialog controlled value
  const [priority, setPriority] = useState<"low" | "medium" | "high">("medium"); // add-dialog controlled
  // dialog states
  const [editDueDate, setEditDueDate] = useState<string>("");
  const [editPriority, setEditPriority] = useState<"low" | "medium" | "high">(
    "medium"
  );
  const [editingId, setEditingId] = useState<string | null>(null);
  const editRef = useRef<HTMLInputElement | null>(null);

  // helpers: convert between input yyyy-mm-dd and ISO 8601
  function inputDateToISO(input?: string): string | undefined {
    if (!input) return undefined;
    // create a Date from the YYYY-MM-DD input and return ISO string (UTC)
    // new Date("YYYY-MM-DD") is parsed as UTC in modern engines, toISOString() produces a valid ISO 8601 timestamp
    try {
      return new Date(input).toISOString();
    } catch {
      return undefined;
    }
  }

  function isoToInputDate(iso?: string): string {
    if (!iso) return "";
    try {
      // Use the ISO string's date portion (UTC) as input date (YYYY-MM-DD)
      return new Date(iso).toISOString().slice(0, 10);
    } catch {
      return "";
    }
  }

  useEffect(() => {
    async function load() {
      try {
        const res: any = await getTodos();
        // normalize rows to Task[]
        const rows = Array.isArray(res)
          ? res
          : Array.isArray(res?.data)
          ? res.data
          : Array.isArray(res?.todos)
          ? res.todos
          : Array.isArray(res?.data?.items)
          ? res.data.items
          : [];
        const normalize = (item: any): Task => ({
          id: String(
            item.id ?? item._id ?? item.todo_id ?? item.id ?? Date.now()
          ),
          text: item.title ?? item.text ?? item.name ?? "",
          completed: !!item.completed,
          createdAt: item.createdAt
            ? new Date(item.createdAt).getTime()
            : item.created_at
            ? new Date(item.created_at).getTime()
            : Date.now(),
          // normalize task_date to ISO 8601 if possible
          task_date: (() => {
            const raw =
              item.task_date ?? item.dueDate ?? item.due_date ?? undefined;
            if (!raw) return undefined;
            // if already looks like full ISO (contains 'T'), keep as-is
            if (typeof raw === "string" && raw.includes("T")) return raw;
            // if format is YYYY-MM-DD, convert to ISO
            if (/^\d{4}-\d{2}-\d{2}$/.test(raw)) {
              return inputDateToISO(raw);
            }
            // otherwise try to parse to ISO
            try {
              return new Date(raw).toISOString();
            } catch {
              return undefined;
            }
          })(),
          priority:
            (item.priority as "low" | "medium" | "high") ??
            (item.task_priority as "low" | "medium" | "high") ??
            undefined,
        });
        setTasks(rows.map(normalize));
      } catch {
        // API already toasts on error; keep UI unchanged
      }
    }
    load();
  }, []);

  useEffect(() => {
    if (editingId && editRef.current) {
      editRef.current.focus();
      editRef.current.select();
    }
  }, [editingId]);

  // confirm creation from dialog
  async function confirmCreate() {
    const value = text.trim();
    if (!value) {
      return;
    }
    try {
      const payload: any = { title: value };
      // convert input YYYY-MM-DD to ISO 8601 before sending
      if (dueDate) payload.task_date = inputDateToISO(dueDate);
      if (priority) payload.priority = priority;
      const res: any = await createTodo(payload);
      const created =
        res?.data ||
        res?.todo ||
        res ||
        (res?.data && (res.data as any).todo) ||
        null;
      const createdItem =
        created ?? (res && typeof res === "object" ? res : null);
      const newTask: Task = createdItem
        ? {
            id: String(createdItem.id ?? createdItem._id ?? Date.now()),
            text: createdItem.title ?? createdItem.text ?? value,
            completed: !!createdItem.completed,
            createdAt: createdItem.createdAt
              ? new Date(createdItem.createdAt).getTime()
              : Date.now(),
            // store task_date as ISO if returned or convert from created input
            task_date:
              (createdItem.task_date
                ? typeof createdItem.task_date === "string" &&
                  /^\d{4}-\d{2}-\d{2}$/.test(createdItem.task_date)
                  ? inputDateToISO(createdItem.task_date)
                  : createdItem.task_date
                : undefined) ?? inputDateToISO(dueDate),
            priority:
              (createdItem.priority as "low" | "medium" | "high") ??
              (createdItem.task_priority as "low" | "medium" | "high") ??
              priority,
          }
        : {
            id: String(Date.now()),
            text: value,
            completed: false,
            createdAt: Date.now(),
            task_date: inputDateToISO(dueDate) ?? undefined,
            priority,
          };
      setTasks((t) => [newTask, ...t]);
      setText("");
      setDueDate("");
      setPriority("medium");
      // Dialog will be closed by DialogClose wrapper on the Create button
    } catch {
      // API toasts on error
    }
  }
  // confirm edit handler (used by DialogClose on Save)
  async function confirmEdit() {
    const id = editingId;
    if (!id) return;
    const v =
      editRef.current?.value?.trim() ??
      tasks.find((t) => t.id === id)?.text ??
      "";
    await saveEdit(id, v, editDueDate, editPriority);
    setEditingId(null);
  }

  async function toggleComplete(id: string) {
    const task = tasks.find((t) => t.id === id);
    if (!task) return;
    const newCompleted = !task.completed;
    try {
      const res: any = await updateTodo(id, { completed: newCompleted });
      const updated = res?.data || res?.todo || res || null;
      if (updated) {
        setTasks((t) =>
          t.map((x) =>
            x.id === id
              ? {
                  ...x,
                  completed: updated.completed ?? newCompleted,
                }
              : x
          )
        );
      } else {
        // fallback: apply optimistic change
        setTasks((t) =>
          t.map((x) => (x.id === id ? { ...x, completed: newCompleted } : x))
        );
      }
    } catch {
      // API toasts on error
    }
  }

  async function removeTask(id: string) {
    try {
      await deleteTodo(id);
      setTasks((t) => t.filter((task) => task.id !== id));
      if (editingId === id) setEditingId(null);
    } catch {
      // API toasts on error
    }
  }

  function startEdit(id: string) {
    setEditingId(id);
  }

  // update saveEdit signature to accept optional due date
  async function saveEdit(
    id: string,
    value: string,
    newDueDate?: string,
    newPriority?: string
  ) {
    const v = value.trim();
    if (!v) {
      await removeTask(id);
      return;
    }
    try {
      const payload: any = { title: v };
      if (newDueDate !== undefined) payload.task_date = newDueDate;
      if (newPriority !== undefined) payload.priority = newPriority;
      const res: any = await updateTodo(id, payload);
      const updated = res?.data || res?.todo || res || null;
      if (updated) {
        setTasks((t) =>
          t.map((task) =>
            task.id === id
              ? {
                  ...task,
                  text: updated.title ?? updated.text ?? v,
                  task_date:
                    updated.task_date ??
                    updated.dueDate ??
                    updated.due_date ??
                    newDueDate ??
                    task.task_date,
                  priority:
                    (updated.priority as "low" | "medium" | "high") ??
                    (updated.task_priority as "low" | "medium" | "high") ??
                    (newPriority as "low" | "medium" | "high") ??
                    task.priority,
                }
              : task
          )
        );
      } else {
        setTasks((t) =>
          t.map((task) =>
            task.id === id
              ? {
                  ...task,
                  text: v,
                  task_date: newDueDate ?? task.task_date,
                  priority:
                    (newPriority as "low" | "medium" | "high") ?? task.priority,
                }
              : task
          )
        );
      }
      setEditingId(null);
    } catch {
      // API toasts on error
    }
  }

  const completedCount = tasks.filter((t) => t.completed).length;

  // filtered tasks for display (search only)
  const visibleTasks = tasks.filter((t) => {
    if (!search.trim()) return true;
    const q = search.trim().toLowerCase();
    return t.text.toLowerCase().includes(q);
  });

  // helper: render badge class by priority
  const badgeClass = (p?: string) =>
    p === "high"
      ? "bg-red-100 text-red-800"
      : p === "medium"
      ? "bg-blue-100 text-blue-800"
      : "bg-green-100 text-green-800";

  return (
    <div className="w-full max-w-6xl mx-auto">
      <div className="grid grid-cols-1 gap-6">
        {/* Main content (folders removed) */}
        <main>
          <Card>
            <CardHeader>
              <CardTitle>To‑Do List</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex gap-2 items-center">
                <Input
                  placeholder="Add a new task..."
                  value={text}
                  onChange={(e) => setText(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter") confirmCreate(); // quick-add with Enter
                  }}
                />

                {/* Add details dialog: Add button triggers it (DialogTrigger) */}
                <Dialog>
                  <DialogTrigger asChild>
                    <Button aria-label="Add task">
                      <Plus className="mr-2" /> Add
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="sm:max-w-[420px]">
                    <DialogHeader>
                      <DialogTitle>Task details</DialogTitle>
                      <DialogDescription className="text-muted-foreground text-sm">
                        Add due date & priority (optional)
                      </DialogDescription>
                    </DialogHeader>
                    <div className="grid gap-3">
                      <div className="grid gap-1">
                        <label className="text-xs text-muted-foreground">
                          Due date
                        </label>
                        <input
                          type="date"
                          value={dueDate}
                          onChange={(e) => setDueDate(e.target.value)}
                          className="rounded-md border px-2 py-1"
                          aria-label="Task due date"
                        />
                      </div>
                      <div className="grid gap-1">
                        <label className="text-xs text-muted-foreground">
                          Priority
                        </label>
                        <Select
                          value={priority}
                          onValueChange={(v) =>
                            setPriority(v as "low" | "medium" | "high")
                          }
                        >
                          <SelectTrigger className="w-full">
                            <SelectValue placeholder="Priority" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="low">Low</SelectItem>
                            <SelectItem value="medium">Medium</SelectItem>
                            <SelectItem value="high">High</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>
                    <DialogFooter className="mt-3 flex justify-end gap-2">
                      <DialogClose asChild>
                        <Button variant="outline">Cancel</Button>
                      </DialogClose>
                      <DialogClose asChild>
                        <Button onClick={confirmCreate}>Create</Button>
                      </DialogClose>
                    </DialogFooter>
                  </DialogContent>
                </Dialog>
              </div>

              {/* search input */}
              <div className="mt-3 flex gap-2 items-center">
                <Input
                  placeholder="Search tasks..."
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  className="flex-1"
                />
                {search && (
                  <Button
                    variant="ghost"
                    onClick={() => setSearch("")}
                    aria-label="Clear search"
                  >
                    Clear
                  </Button>
                )}
              </div>

              <Separator className="my-4" />

              {visibleTasks.length === 0 ? (
                <div className="text-sm text-muted-foreground">
                  {search ? "No tasks match your search." : "No tasks yet."}
                </div>
              ) : (
                <ul className="flex flex-col gap-3">
                  {visibleTasks.map((task) => (
                    <li key={task.id}>
                      <div className="flex items-center gap-3 p-3 rounded-md border">
                        <Checkbox
                          checked={task.completed}
                          onCheckedChange={() => toggleComplete(task.id)}
                          aria-label={`Mark ${task.text} as ${
                            task.completed ? "incomplete" : "complete"
                          }`}
                        />
                        <div className="flex-1">
                          {editingId === task.id ? (
                            <div className="flex gap-2 items-center">
                              <input
                                ref={editRef}
                                className="w-full bg-transparent outline-none text-sm"
                                defaultValue={task.text}
                                onKeyDown={(e) => {
                                  if (e.key === "Enter")
                                    saveEdit(
                                      task.id,
                                      (e.target as HTMLInputElement).value,
                                      editDueDate,
                                      editPriority
                                    );
                                  if (e.key === "Escape") setEditingId(null);
                                }}
                                onBlur={(e) =>
                                  saveEdit(
                                    task.id,
                                    (e.target as HTMLInputElement).value,
                                    editDueDate,
                                    editPriority
                                  )
                                }
                              />

                              {/* Edit-mode: open Dialog for details (DialogTrigger pre-fills edit fields) */}
                              <Dialog
                                onOpenChange={(open) => {
                                  if (!open) setEditingId(null);
                                }}
                              >
                                <DialogTrigger asChild>
                                  <Button
                                    variant="outline"
                                    size="sm"
                                    aria-label="Edit details"
                                    onClick={() => {
                                      setEditingId(task.id);
                                      setEditDueDate(
                                        isoToInputDate(task.task_date)
                                      );
                                      setEditPriority(
                                        task.priority ?? "medium"
                                      );
                                    }}
                                  >
                                    Details
                                  </Button>
                                </DialogTrigger>
                                <DialogContent className="sm:max-w-[420px]">
                                  <DialogHeader>
                                    <DialogTitle>Edit details</DialogTitle>
                                    <DialogDescription className="text-muted-foreground text-sm">
                                      Update due date & priority for this task
                                    </DialogDescription>
                                  </DialogHeader>
                                  <div className="grid gap-3">
                                    <div className="grid gap-1">
                                      <label className="text-xs text-muted-foreground">
                                        Due date
                                      </label>
                                      <input
                                        id={`date-input-${task.id}`}
                                        type="date"
                                        value={editDueDate}
                                        onChange={(e) =>
                                          setEditDueDate(e.target.value)
                                        }
                                        className="rounded-md border px-2 py-1"
                                      />
                                    </div>
                                    <div className="grid gap-1">
                                      <label className="text-xs text-muted-foreground">
                                        Priority
                                      </label>
                                      <Select
                                        value={editPriority}
                                        onValueChange={(v) =>
                                          setEditPriority(
                                            v as "low" | "medium" | "high"
                                          )
                                        }
                                      >
                                        <SelectTrigger className="w-full">
                                          <SelectValue />
                                        </SelectTrigger>
                                        <SelectContent>
                                          <SelectItem value="low">
                                            Low
                                          </SelectItem>
                                          <SelectItem value="medium">
                                            Medium
                                          </SelectItem>
                                          <SelectItem value="high">
                                            High
                                          </SelectItem>
                                        </SelectContent>
                                      </Select>
                                    </div>
                                  </div>
                                  <DialogFooter className="mt-3 flex justify-end gap-2">
                                    <DialogClose asChild>
                                      <Button variant="outline">Cancel</Button>
                                    </DialogClose>
                                    <DialogClose asChild>
                                      <Button
                                        onClick={() => {
                                          confirmEdit();
                                          saveEdit(
                                            task.id,
                                            editRef.current?.value || task.text,
                                            editDueDate,
                                            editPriority
                                          );
                                        }}
                                      >
                                        Save
                                      </Button>
                                    </DialogClose>
                                  </DialogFooter>
                                </DialogContent>
                              </Dialog>
                            </div>
                          ) : (
                            <div
                              className={`select-none ${
                                task.completed
                                  ? "line-through text-muted-foreground"
                                  : ""
                              }`}
                            >
                              <div className="flex items-center justify-between">
                                <div className="flex items-center gap-3">
                                  <div>{task.text}</div>
                                  {/* Badge showing priority */}
                                  <Badge className={badgeClass(task.priority)}>
                                    {task.priority
                                      ? task.priority.toUpperCase()
                                      : "MEDIUM"}
                                  </Badge>
                                </div>
                                {task.task_date && (
                                  <div className="text-xs text-muted-foreground ml-4">
                                    Due{" "}
                                    {new Date(
                                      task.task_date
                                    ).toLocaleDateString()}
                                  </div>
                                )}
                              </div>
                            </div>
                          )}
                          <div className="text-xs text-muted-foreground mt-1">
                            Added {new Date(task.createdAt).toLocaleString()}
                          </div>
                        </div>

                        <div className="flex items-center gap-2">
                          {editingId === task.id ? (
                            <Button
                              size="sm"
                              variant="ghost"
                              onClick={() =>
                                saveEdit(
                                  task.id,
                                  editRef.current?.value || task.text,
                                  editDueDate,
                                  editPriority
                                )
                              }
                            >
                              <Check />
                            </Button>
                          ) : (
                            <Button
                              size="sm"
                              variant="ghost"
                              onClick={() => startEdit(task.id)}
                              aria-label="Edit task"
                            >
                              <Edit />
                            </Button>
                          )}
                          <Button
                            size="sm"
                            variant="destructive"
                            onClick={() => removeTask(task.id)}
                            aria-label="Delete task"
                          >
                            <Trash2 />
                          </Button>
                        </div>
                      </div>
                    </li>
                  ))}
                </ul>
              )}
            </CardContent>

            <CardFooter className="flex items-center justify-between">
              <div className="text-sm text-muted-foreground">
                {visibleTasks.length} task{visibleTasks.length !== 1 ? "s" : ""}{" "}
                — {completedCount} completed
              </div>
              <div className="flex items-center gap-2">
                <Button
                  variant="outline"
                  onClick={() => setTasks((t) => t.filter((x) => !x.completed))}
                  disabled={completedCount === 0}
                >
                  Clear Completed
                </Button>
                <Button
                  variant="ghost"
                  onClick={() => setTasks([])}
                  disabled={tasks.length === 0}
                >
                  Clear All
                </Button>
              </div>
            </CardFooter>
          </Card>
        </main>
      </div>
    </div>
  );
}
