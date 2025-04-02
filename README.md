# Projeto de Geração de Currículos

## Descrição
Este projeto é uma plataforma para criação de currículos personalizados, permitindo aos usuários gerar documentos com templates prontos. O objetivo é facilitar a elaboração de currículos de forma rápida e eficiente.

## Tecnologias Utilizadas
- **Next.js** – Framework React para aplicações web modernas.
- **NextAuth.js** – Autenticação segura e fácil de integrar.
- **TypeScript** – Tipagem estática para maior segurança e manutenção do código.
- **TailwindCSS** – Estilização rápida e responsiva.
- **Axios** – Requisições HTTP assíncronas.
- **Zod** – Validação de esquemas de dados.
- **React Hook Form** – Gerenciamento de formulários eficiente.
- **Drizzle ORM** – ORM moderno e eficiente para TypeScript.
- **Neon** – Banco de dados PostgreSQL hospedado na nuvem.
- **ShadCN UI** – Biblioteca de componentes estilizados para React.

## Instalação e Configuração
### Requisitos
- Node.js v16+
- Conta no Neon para hospedagem do banco de dados

### Passos
1. Clone o repositório:
   ```sh
   git clone https://github.com/viniciuss1001/resumecraft-resumegenerator.git
   ```
2. Entre no diretório do projeto:
   ```sh
   cd seu-repositorio
   ```
3. Instale as dependências:
   ```sh
   npm install
   ```
4. Configure as variáveis de ambiente no arquivo `.env`:
   ```sh
   DATABASE_URL=postgresql://usuario:senha@neon.tech/nome_do_banco
   NEXTAUTH_SECRET=sua_chave_secreta
   ```
5. Rode as migrações do banco de dados:
   ```sh
   npm run db:migrate
   ```

## Comandos do Banco de Dados
- Abrir o painel visual:
   ```sh
   npm run db:studio
   ```
- Aplicar migrações ao banco de dados:
   ```sh
   npm run db:push
   ```
- Gerar arquivos de esquema do banco:
   ```sh
   npm run db:generate
   ```
- Rodar as migrações:
   ```sh
   npm run db:migrate
   ```

## Uso
Execute o comando `[gerenciador de dependência] run dev` para executar o programa localmente.
Acesse `http://localhost:3000` e comece a criar seus currículos personalizados.

## Contribuição
Se quiser contribuir, siga estas etapas:
1. Fork o repositório.
2. Crie uma branch (`git checkout -b feature-nova`).
3. Commit suas alterações (`git commit -m 'Adiciona nova funcionalidade'`).
4. Envie para o repositório (`git push origin feature-nova`).
5. Abra um Pull Request.

## Licença
Este projeto está sob a licença MIT.

