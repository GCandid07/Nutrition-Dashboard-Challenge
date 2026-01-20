"use client";

import {
  ArrowRight,
  Database,
  LayoutTemplate,
  ShieldCheck,
  FileJson,
  ChevronDown,
  ChevronUp,
} from "lucide-react";
import { useState } from "react";
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export default function Home() {
  return (
    <div className="min-h-screen bg-linear-to-b from-slate-50 to-slate-100 text-slate-900">
      <div className="mx-auto max-w-5xl px-6 py-20">
        <header className="mb-16 text-center">
          <div className="mb-6 inline-flex items-center rounded-full bg-green-100 px-3 py-1 text-sm font-medium text-green-700">
            Desafio Frontend
          </div>
          <h1 className="mb-4 text-5xl font-extrabold tracking-tight text-slate-900 sm:text-6xl">
            Nutrition Management <span className="text-green-600">
              Dashboard
            </span>
          </h1>
          <p className="mx-auto max-w-2xl text-lg text-slate-600">
            Bem-vindo, Dev! Este é o seu ponto de partida. Use os Mocks de API
            existentes para construir um dashboard escalável e responsivo.
          </p>
        </header>

        <div className="mb-20 grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          <Card
            icon={<ShieldCheck className="h-6 w-6" />}
            title="1. Autenticação"
            description="Implemente um fluxo de Login (Mock). Trate permissões para os perfis Admin, Nutricionista e Estudante."
          />
          <Card
            icon={<LayoutTemplate className="h-6 w-6" />}
            title="2. Layout do Dashboard"
            description="Crie um layout responsivo com Sidebar e Header. Use o App Router para navegação aninhada."
          />
          <Card
            icon={<Database className="h-6 w-6" />}
            title="3. Fluxos CRUD"
            description="Implemente a Gestão de Clientes e Planos Alimentares. Listagem, Criação, Edição e Exclusão usando as APIs fornecidas."
          />
        </div>

        <div className="rounded-2xl bg-white p-8 shadow-xl ring-1 ring-slate-900/5">
          <div className="mb-6 flex flex-col md:flex-row md:items-center md:justify-between">
            <h2 className="text-2xl font-bold text-start">
              <FileJson className="mr-3 h-6 w-6 inline text-green-600 shrink-0" />
              Documentação da API
            </h2>
            <span className="max-w-max rounded-full bg-green-100 px-3 py-1 text-xs font-semibold text-green-700">
              Pronto para Uso
            </span>
          </div>

          <p className="mb-6 text-slate-600">
            Abaixo você encontra os endpoints disponíveis. Clique para expandir
            e ver o formato esperado de <strong>Payload</strong> e o <strong>
            Response</strong> (Sucesso e Erro).
          </p>

          <div className="space-y-4">
            <div className="mb-4">
              <h3 className="mb-2 text-sm font-bold uppercase text-slate-500 tracking-wider">
                Autenticação
              </h3>
              <div className="space-y-4">
              <ApiAccordion
                method="POST"
                path="/api/auth/login"
                summary="Login de usuário"
                payload={`{
  "email": "nutri@ecowe.com.br",
  "password": "any_password"
}`}
                responseSuccess={`{
  "user": {
    "id": "nutri-1",
    "name": "Nutritionist User",
    "email": "nutri@ecowe.com.br",
    "role": "NUTRITIONIST"
  },
  "access_token": "mock_access_token_nutri-1_1704067200000",
  "refresh_token": "mock_refresh_token_nutri-1_1704067200000"
}`}
                responseError={`{
  "errors": [
    {
      "code": "invalid_credentials",
      "message": "Invalid credentials",
      "path": [],
      "type": "manual"
    }
  ]
}`}
              />

              <ApiAccordion
                method="POST"
                path="/api/auth/register"
                summary="Registrar novo usuário"
                payload={`{
  "name": "New Nutritionist",
  "email": "new@ecowe.com.br",
  "password": "secure_password",
  "role": "NUTRITIONIST" // ou STUDENT
}`}
                responseSuccess={`{
  "user": {
    "id": "abc-123",
    "name": "New Nutritionist",
    "email": "new@ecowe.com.br",
    "role": "NUTRITIONIST"
  },
  "message": "User created successfully. Please login."
}`}
                responseError={`{
  "errors": [
    {
      "code": "user_exists",
      "message": "User already exists",
      "path": [],
      "type": "manual"
    }
  ]
}`}
              />

              <ApiAccordion
                method="POST"
                path="/api/auth/refresh"
                summary="Refresh Token"
                payload={`{
  "refresh_token": "mock_refresh_token_..."
}`}
                responseSuccess={`{
  "access_token": "new_mock_access_token_nutri-1_1704067500000",
  "refresh_token": "new_mock_refresh_token_nutri-1_1704067500000"
}`}
                responseError={`{
  "errors": [
    {
      "code": "invalid_token",
      "message": "Invalid or expired refresh token",
      "path": [],
      "type": "manual"
    }
  ]
}`}
              />
              </div>
            </div>

            <div className="mb-4">
              <h3 className="mb-2 text-sm font-bold uppercase text-slate-500 tracking-wider">
                Gestão de Clientes
              </h3>
              <p className="mb-4 text-xs text-amber-600 bg-amber-50 p-2 rounded border border-amber-200">
                🔒 Requer Header <code>Authorization: Bearer mock_access_token_...</code>
              </p>
            <ApiAccordion
              method="GET"
              path="/api/clients"
              summary="Listar clientes (Paginado + Busca)"
              queryParams={[
                { name: "cursor", type: "string", description: "ID do último item da lista anterior (para paginação infinita)." },
                { name: "limit", type: "number", description: "Quantidade de itens por página. Default: 10." },
                { name: "search", type: "string", description: "Filtrar por nome ou email." },
              ]}
              responseSuccess={`{
  "data": [
    {
      "id": "c1",
      "name": "João Silva",
      "email": "joao@example.com",
      "phone": "11988887777",
      "status": "ACTIVE",
      "created_at": "2023-12-01T10:00:00Z"
    }
  ],
  "next_cursor": "c10" // Token para a próxima página (null se fim)
}`}
              responseError={`{
  "errors": [
    {
      "code": "unauthorized",
      "message": "Unauthorized",
      "path": [],
      "type": "manual"
    }
  ]
}`}
            />

            <ApiAccordion
              method="POST"
              path="/api/clients"
              summary="Criar um novo cliente"
              payload={`{
  "name": "Maria Souza",
  "email": "maria@example.com",
  "phone": "11999999999",
  "status": "ACTIVE"
}`}
              responseSuccess={`{
  "id": "abc-123",
  "name": "Maria Souza",
  "email": "maria@example.com",
  "phone": "11999999999",
  "status": "ACTIVE",
  "created_at": "2024-01-01T10:00:00.000Z"
}`}
              responseError={`{
  "errors": [
    {
      "code": "too_small",
      "minimum": 2,
      "type": "string",
      "inclusive": true,
      "exact": false,
      "message": "Name must be at least 2 characters",
      "path": ["name"]
    }
  ]
}`}
            />

            <ApiAccordion
              method="PUT"
              path="/api/clients/:id"
              summary="Editar cliente (Parcial)"
              payload={`{
  "name": "Maria Souza Editada",
  "status": "INACTIVE" // Values: ACTIVE, INACTIVE
}`}
              responseSuccess={`{
  "id": "abc-123",
  "name": "Maria Souza Editada",
  "email": "maria@example.com",
  "phone": "11999999999",
  "status": "INACTIVE",
  "created_at": "2024-01-01T10:00:00.000Z"
}`}
              responseError={`{
  "errors": [
    {
      "code": "not_found",
      "message": "Client not found",
      "path": [],
      "type": "manual"
    }
  ]
}`}
            />


            <ApiAccordion
              method="DELETE"
              path="/api/clients/:id"
              summary="Deletar cliente"
              responseSuccess={`{
  "success": true
}`}
              responseError={`{
  "errors": [
    {
      "code": "not_found",
      "message": "Client not found",
      "path": [],
      "type": "manual"
    }
  ]
}`}
            />
          </div>

          <div className="mb-4">
            <h3 className="mb-2 text-sm font-bold uppercase text-slate-500 tracking-wider">
              Gestão de Planos Alimentares
            </h3>
            <p className="mb-4 text-xs text-amber-600 bg-amber-50 p-2 rounded border border-amber-200">
                🔒 Requer Header <code>Authorization: Bearer mock_access_token_...</code>
            </p>
            <ApiAccordion
              method="GET"
              path="/api/plans"
              summary="Listar planos (Paginado + Filtros)"
              queryParams={[
                { name: "cursor", type: "string", description: "ID do último item da lista anterior." },
                { name: "limit", type: "number", description: "Quantidade de itens. Default: 10." },
                { name: "search", type: "string", description: "Filtrar por título ou descrição." },
                { name: "status", type: "string", description: "Filtrar por status: ACTIVE, DRAFT ou ARCHIVED." },
              ]}
              responseSuccess={`{
  "data": [
    {
      "id": "p1",
      "title": "Perda de Peso",
      "description": "Plano focado em déficit calórico com alto teor proteico.",
      "calories": 1800,
      "status": "ACTIVE"
    }
    }
  ],
  "next_cursor": "p5"
}`}
              responseError={`{
  "errors": [
    {
      "code": "unauthorized",
      "message": "Unauthorized",
      "path": [],
      "type": "manual"
    }
  ]
}`}
            />

            <ApiAccordion
              method="POST"
              path="/api/plans"
              summary="Criar Plano Alimentar"
              payload={`{
  "clientId": "abc-123", // ID do Cliente (Obrigatório)
  "title": "Hipertrofia",
  "description": "Dieta rica em proteínas...",
  "calories": 3000,
  "status": "DRAFT"
}`}
              responseSuccess={`{
  "id": "xyz-789",
  "clientId": "abc-123",
  "title": "Hipertrofia",
  "description": "Dieta rica em proteínas...",
  "calories": 3000,
  "status": "DRAFT"
}`}
              responseError={`{
  "errors": [
    {
      "code": "invalid_client",
      "message": "Client not found or does not belong to you",
      "path": [],
      "type": "manual"
    }
  ]
}`}
            />

            <ApiAccordion
              method="PUT"
              path="/api/plans/:id"
              summary="Editar Plano (Parcial)"
              payload={`{
  "title": "Hipertrofia (Editado)",
  "status": "ARCHIVED" // Values: ACTIVE, DRAFT, ARCHIVED
}`}
              responseSuccess={`{
  "id": "xyz-789",
  "title": "Hipertrofia (Editado)",
  "description": "Dieta rica em proteínas...",
  "calories": 3200,
  "status": "DRAFT"
}`}
              responseError={`{
  "errors": [
    {
      "code": "not_found",
      "message": "Plan not found",
      "path": [],
      "type": "manual"
    }
  ]
}`}
            />

            <ApiAccordion
              method="DELETE"
              path="/api/plans/:id"
              summary="Deletar Plano"
              responseSuccess={`{
  "success": true
}`}
              responseError={`{
  "errors": [
    {
      "code": "not_found",
      "message": "Plan not found",
      "path": [],
      "type": "manual"
    }
  ]
}`}
            />
            </div>
          </div>

          <div className="mt-8 rounded-lg bg-slate-50 p-4 text-sm text-slate-600 border border-slate-200">
            <p className="font-semibold mb-2">💡 Dicas:</p>
            <ul className="list-disc pl-5 space-y-1">
              <li>
                Os dados são armazenados em memória em <code>src/lib/db.ts</code>. 
                Eles persistem durante o desenvolvimento (hot-reload), mas 
                resetam ao reiniciar o servidor.
              </li>
              <li>
                Schemas Zod estão definidos em <code>src/schemas</code>.
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-20 text-center">
          <p className="text-slate-500 mb-6">
            Pronto para criar <code>src/app/(dashboard)</code>?
          </p>
          <a
            href="/login"
            className="inline-flex items-center justify-center rounded-lg bg-green-600 px-6 py-3 text-base font-medium text-white shadow-lg transition-all hover:bg-green-700 hover:shadow-green-500/25"
          >
            Começar a Construir <ArrowRight className="ml-2 h-4 w-4" />
          </a>
          <p className="mt-2 text-xs text-slate-400">
            (Este link dará 404 até que você o construa!)
          </p>
        </div>
      </div>
    </div>
  );
}

function Card({
  icon,
  title,
  description,
}: {
  icon: React.ReactNode;
  title: string;
  description: string;
}) {
  return (
    <div className="group relative overflow-hidden rounded-2xl bg-white p-6 shadow-md transition-all hover:-translate-y-1 hover:shadow-xl ring-1 ring-slate-900/5">
      <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-xl bg-green-50 text-green-600 group-hover:bg-green-600 group-hover:text-white transition-colors">
        {icon}
      </div>
      <h3 className="mb-2 text-lg font-bold text-slate-900">{title}</h3>
      <p className="text-slate-500 leading-relaxed">{description}</p>
    </div>
  );
}

interface QueryParam {
  name: string;
  type: string;
  description: string;
}

interface ApiAccordionProps {
  method: "GET" | "POST" | "PUT" | "DELETE";
  path: string;
  summary: string;
  queryParams?: QueryParam[];
  payload?: string;
  responseSuccess?: string;
  responseError?: string;
}

function ApiAccordion({
  method,
  path,
  summary,
  queryParams,
  payload,
  responseSuccess,
  responseError,
}: ApiAccordionProps) {
  const [isOpen, setIsOpen] = useState(false);

  const methodColors = {
    GET: "bg-blue-100 text-blue-700",
    POST: "bg-green-100 text-green-700",
    PUT: "bg-orange-100 text-orange-700",
    DELETE: "bg-red-100 text-red-700",
  };

  return (
    <div className="border border-slate-200 rounded-lg overflow-hidden bg-slate-50/50">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex items-center justify-between p-4 bg-white hover:bg-slate-50 transition-colors"
      >
        <div className="flex items-center gap-3 font-mono text-sm">
          <span className={cn(
            "font-bold px-2 py-1 rounded text-xs",
            methodColors[method]
          )}>
            {method}
          </span>
          <span className="text-slate-700 font-semibold">{path}</span>
          <span className="text-slate-400 hidden sm:inline">-</span>
          <span className="text-slate-500 text-xs sm:text-sm font-sans">
            {summary}
          </span>
        </div>
        {isOpen
          ? <ChevronUp className="h-4 w-4 text-slate-400" />
          : <ChevronDown className="h-4 w-4 text-slate-400" />}
      </button>

      {isOpen && (
        <div className="p-4 border-t border-slate-200 grid gap-4 md:grid-cols-2 animate-in fade-in slide-in-from-top-1 duration-200">
          {queryParams && (
            <div className="md:col-span-2">
              <h4 className="mb-2 text-xs font-bold uppercase text-slate-500">
                Query Parameters
              </h4>
              <div className="bg-white border border-slate-200 rounded-md overflow-hidden">
                <table className="min-w-full text-xs text-left">
                  <thead className="bg-slate-50 text-slate-500 font-medium">
                    <tr>
                      <th className="px-3 py-2 border-b border-slate-200">
                        Param
                      </th>
                      <th className="px-3 py-2 border-b border-slate-200">
                        Type
                      </th>
                      <th className="px-3 py-2 border-b border-slate-200">
                        Description
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    {queryParams.map((param) => (
                      <tr key={param.name}>
                        <td className="px-3 py-2 font-mono text-indigo-600">
                          {param.name}
                        </td>
                        <td className="px-3 py-2 text-slate-500">
                          {param.type}
                        </td>
                        <td className="px-3 py-2 text-slate-700">
                          {param.description}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {payload && (
            <div>
              <h4 className="mb-2 text-xs font-bold uppercase text-slate-500">
                Payload (Request Body)
              </h4>
              <div className="bg-slate-900 rounded-md p-3 overflow-x-auto">
                <pre className="text-xs text-green-400 font-mono">
                  {payload}
                </pre>
              </div>
            </div>
          )}

          {(responseSuccess || responseError) && (
            <div className={cn(!payload && "md:col-span-2")}>
              <h4 className="mb-2 text-xs font-bold uppercase text-slate-500">
                Response (JSON)
              </h4>

              {responseSuccess && (
                <div className="mb-3">
                  <span className="text-[10px] uppercase font-bold text-green-600 bg-green-50 px-1.5 py-0.5 rounded border border-green-100 mb-1 inline-block">200/201 Success</span>
                  <div className="bg-slate-900 rounded-md p-3 overflow-x-auto">
                    <pre className="text-xs text-blue-300 font-mono">
                      {responseSuccess}
                    </pre>
                  </div>
                </div>
              )}

              {responseError && (
                <div>
                  <span className="text-[10px] uppercase font-bold text-red-600 bg-red-50 px-1.5 py-0.5 rounded border border-red-100 mb-1 inline-block">400 Error</span>
                  <div className="bg-slate-900 rounded-md p-3 overflow-x-auto">
                    <pre className="text-xs text-red-300 font-mono">
                      {responseError}
                    </pre>
                  </div>
                </div>
              )}
            </div>
          )}

          {!payload && !responseSuccess && !responseError && !queryParams && (
            <p className="text-sm text-slate-400 italic">
              Nenhum detalhe adicional.
            </p>
          )}
        </div>
      )}
    </div>
  );
}
