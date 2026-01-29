# Product Requirements Document (PRD) - E-commerce2b

## 1. Visão Geral do Projeto
**Nome do Projeto:** E-commerce2b (Vibe v2)
**Descrição:** Plataforma web moderna e interativa focada em conectar negócios ao mundo digital. O projeto utiliza tecnologias de ponta para oferecer uma experiência de usuário imersiva, com animações 3D, transições suaves e design responsivo de alta performance.
**Idioma:** Português (pt-BR)

## 2. Tecnologias (Tech Stack)
*   **Framework:** Next.js 16.1.4 (App Router)
*   **Biblioteca UI:** React 19.2.3
*   **Estilização:** Tailwind CSS v4
*   **Animações:**
    *   Framer Motion (interações de UI)
    *   GSAP (animações complexas e scroll-triggers)
*   **3D / WebGL:**
    *   Three.js
    *   @react-three/fiber
    *   @react-three/drei
    *   @react-three/postprocessing
*   **Scroll:** Lenis (Smooth Scrolling)
*   **Tipografia:**
    *   Inter (Google Fonts)
    *   Plus Jakarta Sans (Google Fonts)
*   **Ícones:** Lucide React

## 3. Arquitetura da Aplicação
A aplicação segue a estrutura de diretórios do **Next.js App Router**:

*   **`app/`**: Contém as rotas e layout principal.
    *   `layout.tsx`: Layout raiz com configurações de fonte, metadados e Smooth Scroll.
    *   `page.tsx`: Página única (Landing Page) que orquestra as seções principais.
*   **`components/`**: Componentes modulares reutilizáveis.
    *   Seções da Landing Page (`Hero`, `About`, `Method`, etc.)
    *   Componentes UI (`Navbar`, `Footer`, `Globe3D`, etc.)

## 4. Funcionalidades e Seções
A página principal é composta pelas seguintes seções, ordenadas verticalmente:

### 4.1. Navbar (`Navbar.tsx`)
*   Barra de navegação fixa ou sticky.
*   Links para as âncoras das seções.
*   Design responsivo (menu mobile vs desktop).

### 4.2. Hero Section (`Hero.tsx`)
*   **Componente 3D:** Globo interativo (`Globe3D.tsx`).
*   **Conteúdo:** Título principal de impacto, subtítulo e Call-to-Action (CTA).
*   **Efeitos:** Animações de entrada e interatividade com mouse.

### 4.3. Sobre (`About.tsx`)
*   Apresentação da empresa/marca.
*   Possível uso de grids ou layouts assimétricos para destacar valores.

### 4.4. Método (`Method.tsx`)
*   Explicação do processo de trabalho ou metodologia da E-commerce2b.
*   Provavelmente contém passos interativos ou cartões informativos.

### 4.5. Depoimentos (`Testimonials.tsx`)
*   Carrossel ou grid de prova social.
*   Feedback de clientes.

### 4.6. Contato (`Contact.tsx`)
*   Formulário de contato ou informações diretas (email, redes sociais).

### 4.7. Rodapé (`Footer.tsx`)
*   Links rápidos, informações legais e copyright.
*   Design consistente com o tema escuro ("Deep Onyx").

## 5. Design UI/UX
*   **Paleta de Cores:**
    *   Fundo Principal: `bg-deep-onyx` (Tema escuro premium).
    *   Destaques: `selection:bg-logo-blue`, `text-white`.
*   **Tipografia:** Combinação de *Inter* (texto geral) e *Plus Jakarta Sans* (títulos/destaques).
*   **Experiência Visual:**
    *   **Smooth Scroll:** Implementado globalmente para uma navegação fluida.
    *   **Noise Overlay:** Textura de ruído (`noise-overlay`) aplicada sobre toda a aplicação para estética moderna.
    *   **Animações:** Entradas suaves de elementos (fade-in, slide-up) ao rolar a página.

## 6. Configurações de Desenvolvimento
*   **Linter:** ESLint (configuração Next.js).
*   **Depedências de Desenvolvimento:** Typescript, PostCSS.
*   **Comandos:**
    *   `npm run dev`: Inicia servidor local.
    *   `npm run build`: Build de produção.
    *   `npm run start`: Inicia produção.
