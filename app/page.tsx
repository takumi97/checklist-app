"use client";
import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Trash2 } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export default function ChecklistApp() {
  const [items, setItems] = useState([
    { id: 1, text: "アイディアを書く", done: false },
    { id: 2, text: "UIデザインを調整", done: true },
  ]);
  const [input, setInput] = useState("");

  const addItem = () => {
    if (!input.trim()) return;
    setItems([...items, { id: Date.now(), text: input, done: false }]);
    setInput("");
  };

  const toggleItem = (id) => {
    setItems(
      items.map((item) =>
        item.id === id ? { ...item, done: !item.done } : item
      )
    );
  };

  const deleteItem = (id) => {
    setItems(items.filter((item) => item.id !== id));
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#f8f9fa] to-[#e9ecef] flex items-center justify-center p-4 font-sans">
      <Card className="w-full max-w-md p-6 rounded-3xl shadow-2xl border border-gray-200 backdrop-blur-sm bg-white/80">
        <CardContent>
          <h1 className="text-3xl font-semibold mb-6 text-center text-gray-800 tracking-tight">
            ✅ チェックリスト
          </h1>

          <div className="flex gap-2 mb-6">
            <Input
              placeholder="新しい項目を入力"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              className="flex-1 rounded-xl text-base px-4 py-2 shadow-inner bg-white/70 backdrop-blur-sm"
            />
            <Button onClick={addItem} className="rounded-xl px-4 text-base shadow-md">
              追加
            </Button>
          </div>

          <ul className="space-y-4">
            <AnimatePresence>
              {items.map((item) => (
                <motion.li
                  key={item.id}
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, x: 20 }}
                  transition={{ duration: 0.2 }}
                  className="flex items-center justify-between bg-white p-4 rounded-2xl shadow-md transition hover:shadow-lg"
                >
                  <div className="flex items-center gap-3">
                    <Checkbox
                      checked={item.done}
                      onCheckedChange={() => toggleItem(item.id)}
                      className="h-5 w-5 rounded-full border-gray-300"
                    />
                    <span
                      className={\`text-base \${item.done ? "line-through text-gray-400" : "text-gray-800"}\`}
                    >
                      {item.text}
                    </span>
                  </div>
                  <button onClick={() => deleteItem(item.id)}>
                    <Trash2 className="w-5 h-5 text-red-400 hover:text-red-600 transition" />
                  </button>
                </motion.li>
              ))}
            </AnimatePresence>
          </ul>
        </CardContent>
      </Card>
    </div>
  );
}