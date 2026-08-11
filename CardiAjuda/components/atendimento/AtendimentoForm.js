import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Activity, Droplet, User, Stethoscope, Calendar, FileText, X } from "lucide-react";

export default function AtendimentoForm({ onSubmit, onCancel, initialData }) {
  const [form, setForm] = useState({
    paciente_nome: initialData?.paciente_nome || "",
    data_consulta: initialData?.data_consulta || new Date().toISOString().slice(0, 10),
    tipo: initialData?.tipo || "Consulta",
    profissional: initialData?.profissional || "",
    pressao_sistolica: initialData?.pressao_sistolica ?? "",
    pressao_diastolica: initialData?.pressao_diastolica ?? "",
    glicemia: initialData?.glicemia ?? "",
    observacoes: initialData?.observacoes || "",
    status: initialData?.status || "Agendada",
  });
  const [loading, setLoading] = useState(false);

  const handleChange = (field, value) => setForm((f) => ({ ...f, [field]: value }));

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await onSubmit({
        ...form,
        pressao_sistolica: form.pressao_sistolica === "" ? null : Number(form.pressao_sistolica),
        pressao_diastolica: form.pressao_diastolica === "" ? null : Number(form.pressao_diastolica),
        glicemia: form.glicemia === "" ? null : Number(form.glicemia),
      });
    } finally {
      setLoading(false);
    }
  };

  const fieldClass = "grid gap-1.5";
  const inputIcon = "h-4 w-4 text-muted-foreground";

  return (
    <Card className="border-none shadow-lg shadow-slate-200/60 ring-1 ring-slate-100">
      <CardHeader className="bg-gradient-to-r from-rose-50 to-amber-50 rounded-t-xl">
        <div className="flex items-center justify-between">
          <CardTitle className="flex items-center gap-2 text-slate-800">
            <Stethoscope className="h-5 w-5 text-rose-600" />
            {initialData ? "Editar Atendimento" : "Novo Atendimento"}
          </CardTitle>
          <Button variant="ghost" size="icon" onClick={onCancel} className="h-8 w-8">
            <X className="h-4 w-4" />
          </Button>
        </div>
      </CardHeader>
      <form onSubmit={handleSubmit}>
        <CardContent className="pt-6 space-y-5">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className={fieldClass}>
              <Label className="flex items-center gap-1.5 text-slate-700">
                <User className={inputIcon} /> Nome do Paciente
              </Label>
              <Input
                required
                value={form.paciente_nome}
                onChange={(e) => handleChange("paciente_nome", e.target.value)}
                placeholder="Nome completo"
              />
            </div>
            <div className={fieldClass}>
              <Label className="flex items-center gap-1.5 text-slate-700">
                <Calendar className={inputIcon} /> Data do Atendimento
              </Label>
              <Input
                required
                type="date"
                value={form.data_consulta}
                onChange={(e) => handleChange("data_consulta", e.target.value)}
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className={fieldClass}>
              <Label className="text-slate-700">Tipo de Atendimento</Label>
              <Select value={form.tipo} onValueChange={(v) => handleChange("tipo", v)}>
                <SelectTrigger><SelectValue /></SelectTrigger>
                <SelectContent>
                  <SelectItem value="Consulta">Consulta</SelectItem>
                  <SelectItem value="Retorno">Retorno</SelectItem>
                  <SelectItem value="Emergência">Emergência</SelectItem>
                  <SelectItem value="Acompanhamento">Acompanhamento</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className={fieldClass}>
              <Label className="flex items-center gap-1.5 text-slate-700">
                <Stethoscope className={inputIcon} /> Profissional Responsável
              </Label>
              <Input
                value={form.profissional}
                onChange={(e) => handleChange("profissional", e.target.value)}
                placeholder="Dr(a). Nome"
              />
            </div>
          </div>

          <div className="rounded-xl bg-slate-50 p-4 space-y-4">
            <p className="text-sm font-medium text-slate-600 flex items-center gap-1.5">
              <Activity className="h-4 w-4 text-rose-500" /> Sinais Vitais
            </p>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              <div className={fieldClass}>
                <Label className="text-slate-700 text-xs">Sistólica (mmHg)</Label>
                <Input
                  type="number"
                  value={form.pressao_sistolica}
                  onChange={(e) => handleChange("pressao_sistolica", e.target.value)}
                  placeholder="120"
                />
              </div>
              <div className={fieldClass}>
                <Label className="text-slate-700 text-xs">Diastólica (mmHg)</Label>
                <Input
                  type="number"
                  value={form.pressao_diastolica}
                  onChange={(e) => handleChange("pressao_diastolica", e.target.value)}
                  placeholder="80"
                />
              </div>
              <div className={fieldClass}>
                <Label className="flex items-center gap-1 text-slate-700 text-xs">
                  <Droplet className="h-3 w-3 text-amber-600" /> Glicemia (mg/dL)
                </Label>
                <Input
                  type="number"
                  value={form.glicemia}
                  onChange={(e) => handleChange("glicemia", e.target.value)}
                  placeholder="100"
                />
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className={fieldClass}>
              <Label className="text-slate-700">Status</Label>
              <Select value={form.status} onValueChange={(v) => handleChange("status", v)}>
                <SelectTrigger><SelectValue /></SelectTrigger>
                <SelectContent>
                  <SelectItem value="Agendada">Agendada</SelectItem>
                  <SelectItem value="Realizada">Realizada</SelectItem>
                  <SelectItem value="Cancelada">Cancelada</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className={fieldClass}>
            <Label className="flex items-center gap-1.5 text-slate-700">
              <FileText className={inputIcon} /> Observações
            </Label>
            <Textarea
              value={form.observacoes}
              onChange={(e) => handleChange("observacoes", e.target.value)}
              placeholder="Anotações clínicas, prescrições, orientações..."
              rows={3}
            />
          </div>

          <div className="flex justify-end gap-3 pt-2">
            <Button type="button" variant="outline" onClick={onCancel}>
              Cancelar
            </Button>
            <Button type="submit" disabled={loading} className="bg-rose-600 hover:bg-rose-700">
              {loading ? "Salvando..." : "Salvar Atendimento"}
            </Button>
          </div>
        </CardContent>
      </form>
    </Card>
  );
}