import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Activity, Droplet, Calendar, User, Stethoscope, Pencil, Trash2 } from "lucide-react";

const tipoStyles = {
  Consulta: "bg-sky-100 text-sky-700",
  Retorno: "bg-violet-100 text-violet-700",
  Emergência: "bg-red-100 text-red-700",
  Acompanhamento: "bg-emerald-100 text-emerald-700",
};

const statusStyles = {
  Agendada: "bg-amber-100 text-amber-700 border-amber-200",
  Realizada: "bg-emerald-100 text-emerald-700 border-emerald-200",
  Cancelada: "bg-slate-100 text-slate-500 border-slate-200",
};

function classifyBP(sis, dia) {
  if (!sis || !dia) return null;
  if (sis >= 140 || dia >= 90) return { label: "Elevada", color: "text-red-600" };
  if (sis >= 130 || dia >= 85) return { label: "Atenção", color: "text-amber-600" };
  return { label: "Normal", color: "text-emerald-600" };
}

function classifyGlucose(g) {
  if (!g) return null;
  if (g >= 126) return { label: "Elevada", color: "text-red-600" };
  if (g >= 100) return { label: "Atenção", color: "text-amber-600" };
  return { label: "Normal", color: "text-emerald-600" };
}

export default function AtendimentoCard({ atendimento, onEdit, onDelete }) {
  const { paciente_nome, data_consulta, tipo, profissional, pressao_sistolica, pressao_diastolica, glicemia, observacoes, status } = atendimento;
  const bp = classifyBP(pressao_sistolica, pressao_diastolica);
  const glucose = classifyGlucose(glicemia);
  const dataFmt = data_consulta ? new Date(data_consulta + "T00:00:00").toLocaleDateString("pt-BR") : "";

  return (
    <Card className="border-none shadow-sm shadow-slate-200/60 ring-1 ring-slate-100 hover:shadow-md hover:ring-rose-100 transition-all duration-200">
      <CardContent className="pt-5">
        <div className="flex flex-col gap-4">
          <div className="flex items-start justify-between gap-3">
            <div className="space-y-1">
              <h3 className="font-semibold text-slate-800 flex items-center gap-1.5">
                <User className="h-4 w-4 text-slate-400" />
                {paciente_nome}
              </h3>
              <p className="text-xs text-slate-500 flex items-center gap-1.5">
                <Calendar className="h-3.5 w-3.5" />
                {dataFmt}
                {profissional && (
                  <>
                    <span className="mx-1 text-slate-300">•</span>
                    <Stethoscope className="h-3.5 w-3.5" />
                    {profissional}
                  </>
                )}
              </p>
            </div>
            <div className="flex items-center gap-2">
              <Badge className={tipoStyles[tipo] || "bg-slate-100 text-slate-700"} variant="secondary">
                {tipo}
              </Badge>
              <Badge variant="outline" className={statusStyles[status] || ""}>
                {status}
              </Badge>
            </div>
          </div>

          {(pressao_sistolica || glicemia) && (
            <div className="flex flex-wrap gap-3">
              {bp && (
                <div className="flex items-center gap-2 rounded-lg bg-slate-50 px-3 py-2">
                  <Activity className="h-4 w-4 text-rose-500" />
                  <div>
                    <p className="text-xs text-slate-500">Pressão Arterial</p>
                    <p className="text-sm font-semibold text-slate-800">
                      {pressao_sistolica}/{pressao_diastolica}
                      <span className={`ml-2 text-xs font-medium ${bp.color}`}>{bp.label}</span>
                    </p>
                  </div>
                </div>
              )}
              {glucose && (
                <div className="flex items-center gap-2 rounded-lg bg-slate-50 px-3 py-2">
                  <Droplet className="h-4 w-4 text-amber-600" />
                  <div>
                    <p className="text-xs text-slate-500">Glicemia</p>
                    <p className="text-sm font-semibold text-slate-800">
                      {glicemia} mg/dL
                      <span className={`ml-2 text-xs font-medium ${glucose.color}`}>{glucose.label}</span>
                    </p>
                  </div>
                </div>
              )}
            </div>
          )}

          {observacoes && (
            <p className="text-sm text-slate-600 bg-slate-50 rounded-lg p-3 line-clamp-3">
              {observacoes}
            </p>
          )}

          <div className="flex justify-end gap-2 pt-1 border-t border-slate-100">
            <Button size="sm" variant="ghost" onClick={() => onEdit(atendimento)} className="text-slate-600 hover:text-slate-800">
              <Pencil className="h-3.5 w-3.5 mr-1" /> Editar
            </Button>
            <Button size="sm" variant="ghost" onClick={() => onDelete(atendimento)} className="text-rose-600 hover:text-rose-700 hover:bg-rose-50">
              <Trash2 className="h-3.5 w-3.5 mr-1" /> Excluir
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}