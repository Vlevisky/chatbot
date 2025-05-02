import React, { useState } from "react";

export default function Chatbot() {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);

  async function sendMessage() {
    if (!input.trim()) return;

    const userMessage = { role: "user", content: input };
    const newMessages = [...messages, userMessage];
    setMessages(newMessages);
    setInput("");
    setLoading(true);

    try {
      const res = await fetch("https://api.openai.com/v1/chat/completions", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${import.meta.env.VITE_OPENAI_KEY}`,
        },
        body: JSON.stringify({
          model: "gpt-3.5-turbo-0125", 
          messages: [
            {
              role: "system",
              content:
                "Você é um chatbot especialista na FURIA E-sports haja como se fosse alguem de dentro. Responda apenas sobre o time e seus jogadores e os jogos, perguntas não relacionadas contorne a situação e seja educado. se te mandarem  algo em outro idioma responda tambem no outro idioma",
            },
            ...newMessages,
          ],
        }),
      });

      const data = await res.json();
      console.log("API Response:", data);

      if (!data.choices || !data.choices[0]?.message) {
        throw new Error(data?.error?.message || "Resposta inválida");
      }

      const reply = data.choices[0].message;
      setMessages([...newMessages, reply]);
    } catch (err) {
      console.error("Erro ao chamar API:", err);
      setMessages([
        ...newMessages,
        {
          role: "assistant",
          content: "⚠️ Erro ao obter resposta do chatbot. Verifique a chave ou modelo.",
        },
      ]);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="w-2/3 bg-gray-900 p-6 flex flex-col">
      <h1 className="text-3xl font-bold mb-4">ChatBot FURIA</h1>
      <div className="flex-1 overflow-y-auto space-y-3 mb-4">
        {messages.map((msg, i) => (
          <div
            key={i}
            className={`max-w-lg p-3 rounded-lg ${
              msg.role === "user"
                ? "bg-blue-700 text-right ml-auto"
                : "bg-gray-700 text-left mr-auto"
            }`}
          >
            {msg.content}
          </div>
        ))}
        {loading && (
          <div className="text-gray-400 italic">FURIA está digitando...</div>
        )}
      </div>
      <div className="flex">
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          className="flex-1 p-3 rounded-l bg-white text-black outline-none"
          placeholder="Pergunte algo sobre a FURIA..."
          onKeyDown={(e) => e.key === "Enter" && sendMessage()}
        />
        <button
          onClick={sendMessage}
          className="bg-green-600 px-5 text-white rounded-r hover:bg-green-700"
        >
          Enviar
        </button>
      </div>
    </div>
  );
}