# Parental Control Platform

Plataforma de controle parental para Android (própria, não baseada em Family Link).

## Estrutura

```
parental-control/
├── backend/              # NestJS + TypeScript + PostgreSQL
├── android-parent/       # App do responsável (Kotlin + Compose)
├── android-supervised/   # App do dispositivo supervisionado
├── web/                  # Painel web (Next.js)
├── docker/               # Docker Compose (dev)
└── docs/                 # Documentação
```

## Fase 1 (atual)

- [x] Backend NestJS
- [x] Autenticação (register / login / JWT)
- [x] Famílias
- [x] Dispositivos
- [x] Pareamento seguro (código + token/QR)
- [x] Políticas básicas
- [x] Docker Compose (Postgres + Redis)
- [ ] Apps Android (próximos)
- [ ] Painel Web (próximos)

## Como rodar o backend (desenvolvimento)

### 1. Subir banco e Redis

```bash
cd docker
docker compose up -d
```

### 2. Backend

```bash
cd backend
cp .env.example .env   # se necessário
npm install
npm run start:dev
```

API: http://localhost:3000/api/v1  
Swagger: http://localhost:3000/api/docs

### Endpoints principais (Fase 1)

| Método | Rota | Descrição |
|--------|------|-----------|
| POST | /auth/register | Criar conta |
| POST | /auth/login | Login |
| GET | /me | Perfil do usuário |
| POST | /families | Criar família |
| GET | /families | Listar famílias |
| GET | /devices | Listar dispositivos |
| POST | /pairings | Gerar código de pareamento |
| POST | /pairings/validate | Vincular dispositivo (app supervisionado) |
| GET | /devices/:id/policy | Ver política |
| PUT | /devices/:id/policy | Atualizar política |

## Segurança

- Senhas com Argon2id
- JWT de curta duração
- Tokens de pareamento com hash + uso único + expiração
- Autorização por família (sem acesso cruzado)
- Validação de entrada com class-validator

## Próximos passos (Fase 2)

- Sincronização
- Status online/offline
- Comandos remotos
- WorkManager no app supervisionado
