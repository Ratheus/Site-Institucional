# TNTFIT — Contexto do Projeto

## Visão Geral

Site institucional da **TNTFIT**, uma rede de academias premium em São Paulo. O site é estático (HTML + CSS + JS vanilla), sem framework. O desenvolvimento está sendo feito localmente em:

```
D:\Clientes\TNTFIT\Site Institucional\
```

---

## Stack

- **HTML5** semântico
- **CSS3** vanilla com custom properties (design tokens)
- **JavaScript** vanilla (IIFE, sem dependências)
- **Fontes:** Barlow Condensed (headlines) + DM Sans (body) via Google Fonts
- **Ícones:** Phosphor Icons (via CDN unpkg)
- **Repositório git** inicializado, branch `main`

---

## Estrutura de Arquivos

```
Site Institucional/
├── index.html
├── assets/
│   ├── css/
│   │   ├── style.css       ← design system global (homepage)
│   │   └── pages.css       ← estilos de páginas internas
│   ├── js/
│   │   └── main.js         ← lógica JS (nav, reveals, marquee, vídeos, preloader)
│   └── img/
│       ├── Ícone Amarelo SVG.svg
│       ├── Hammer Strength Select Lat Pulldown - Início 2.png
│       ├── Hammer-Strength-Select-Lat-Pulldown.webm
│       ├── PLATE LOADED INCLINE HORIZONTAL PRESS - Início.png
│       ├── PLATE-LOADED-INCLINE-HORIZONTAL-PRESS.webm
│       ├── Série de Insígnias Lateral - Início - Editada.png
│       └── Série-de-Insígnias-Lateral.webm
```

---

## Design System (tokens CSS)

```css
--bg:          #0A0A0A   /* fundo principal */
--bg-2:        #111111   /* fundo seções alternadas */
--bg-3:        #1A1A1A   /* cards */
--accent:      #ffff00   /* amarelo da marca */
--text-1:      #F2F2F2
--text-2:      #999999
--text-3:      #555555
--border:      rgba(255,255,255,0.07)
--radius-md:   12px
--radius-lg:   20px
--trans:       0.4s cubic-bezier(0.16,1,0.3,1)
--font-head:   'Barlow Condensed'
--font-body:   'DM Sans'
```

---

## Páginas Previstas (nav)

| Rota | Status |
|------|--------|
| `/` (Home) | ✅ Completa (aguardando imagens reais) |
| `/sobre/` | ✅ Completa (aguardando imagem real) |
| `/unidades/` | ✅ Completa (aguardando fotos das unidades) |
| `/modalidades/` | ✅ Completa com planos (aguardando fotos das modalidades) |
| `/trabalhe-conosco/` | ✅ Completa |
| `/seja-investidor/` | ✅ Completa |
| `/faq/` | ✅ Completa (9 perguntas) |

---

## Homepage (index.html) — Seções Implementadas

### 1. Preloader
- Logo SVG (`Ícone Amarelo SVG.svg`) centrado, pequeno
- Pisca 3× com glow amarelo (`drop-shadow`)
- Expande em direção à tela (`scale(20)`) e some
- Fundo revela o site por trás durante a expansão
- Duração total: **2.8s**
- Animações do Hero ficam pausadas até o preloader terminar (classe `js-preloader` no body)
- Fallback via `setTimeout(4000)` caso `animationend` não dispare

### 2. Navbar
- Fixa no topo, transparente por padrão
- Ao rolar >40px: glass effect (`backdrop-filter: blur(16px)` + fundo semitransparente)
- Links de navegação + botão CTA "Matricule-se" (WhatsApp)
- Menu burger para mobile (toggle classe `open`)

### 3. Hero — Split-screen assimétrico
- Grid `55fr 45fr`
- Esquerda: tag, H1 (3 linhas), subtítulo, 2 CTAs, 4 stats (5 unidades / 8+ modalidades / 24h / 0 fidelidade)
- Direita: imagem de fundo com overlay gradient
- Animações de entrada (`fadeUp`) pausadas durante preloader, disparam ao finalizar
- **Imagem atual:** placeholder picsum (substituir por foto real)

### 4. Marquee
- Faixa amarela com modalidades em loop contínuo
- Pausa ao hover
- Conteúdo duplicado via JS para loop seamless

### 5. Diferenciais — Bento Grid
- Grid `2fr 1fr` com 4 cards
- Card grande (ocupa 2 linhas): Life Fitness & Hammer Strength
- Efeito spotlight radial que segue o mouse (CSS custom properties `--mx` / `--my`)
- Scroll reveal via IntersectionObserver

### 6. Sobre — Preview Split
- Grid `1fr 1fr`
- Esquerda: imagem (zoom suave ao hover)
- Direita: texto + botão "Conheça Nossa História"
- **Imagem atual:** placeholder picsum (substituir por foto real)

### 7. Infraestrutura — Cards de Equipamentos ✅ RECÉM IMPLEMENTADO
- Grid `3 colunas` (responsivo: 2 em tablet, 1 em mobile)
- 3 cards com imagem + vídeo hover:

| Card | Marca | Equipamento | Imagem | Vídeo |
|------|-------|-------------|--------|-------|
| 1 | Hammer Strength | Select Lat Pulldown | `Hammer Strength Select Lat Pulldown - Início 2.png` | `Hammer-Strength-Select-Lat-Pulldown.webm` |
| 2 | Hammer Strength | Plate Loaded Incline Horizontal Press | `PLATE LOADED INCLINE HORIZONTAL PRESS - Início.png` | `PLATE-LOADED-INCLINE-HORIZONTAL-PRESS.webm` |
| 3 | Life Fitness | Série de Insígnias Lateral | `Série de Insígnias Lateral - Início - Editada.png` | `Série-de-Insígnias-Lateral.webm` |

**Comportamento hover:**
- Card cresce (`scale(1.03)`) + borda amarela + sombra profunda
- Imagem faz `opacity: 0`, vídeo faz `opacity: 1`
- Vídeo só aparece após `readyState >= 2` (classe `video-ready` via JS)
- `preload="auto"` nos 3 vídeos
- `playbackRate` atual: `1` (velocidade normal) — ajustável nas linhas 76 e 82 de `main.js`
- Anti-tremor: `will-change: transform` + `backface-visibility: hidden` no card; `transform: translateZ(0)` no container de mídia

### 8. Unidades — Grid Preview
- 5 cards (3 colunas → 2 tablet → 1 mobile)
- Imagens: placeholder picsum (substituir por fotos reais de cada unidade)
- Unidades: Elísio, Edgar Facó, Parada de Taipas, Paula Ferreira, CT Taipas

### 9. CTA Banner
- Fundo escuro com textura noise (SVG inline)
- Chamada para WhatsApp

### 10. Footer
- Grid `1.5fr 1fr 1fr`
- Logo, descrição, redes sociais (Instagram + WhatsApp)
- Nav de rodapé
- Endereço e contatos

---

## JS — main.js (funcionalidades)

```
1. Preloader     → remove elemento, libera scroll, inicia Hero
2. Nav scroll    → classe 'scrolled' ao rolar >40px
3. Nav mobile    → burger toggle
4. Scroll reveal → IntersectionObserver nos elementos .reveal
5. Marquee       → clone do track para loop infinito
6. Bento         → spotlight mousemove (--mx, --my)
7. Equipamentos  → hover play/pause vídeo + classe video-ready
8. Active link   → destaca link da página atual pelo pathname
```

---

## Estado Atual do Projeto

- **Última ação:** Ajustes de qualidade e preparação para deploy — caminhos absolutos `/assets/`, bug CSS no CTA banner, acessibilidade mobile menu, FAQ accordion consolidado no main.js, CT Taipas no grid com CSS puro
- **Estrutura de assets:** Todas as páginas internas usam caminhos absolutos (`/assets/css/style.css`, `/assets/js/main.js`) — compatível com `public_html` da Hostinger
- **Imagens pendentes:** Placeholders `picsum.photos` em todas as páginas

---

## Pendências / Próximos Passos

- [ ] Substituir imagem do Hero (`index.html`) por foto real da academia
- [ ] Substituir placeholders das unidades por fotos reais de cada unidade
- [ ] Substituir placeholders das modalidades por fotos reais de cada aula
- [ ] Substituir placeholder da página Sobre por foto real
- [ ] Substituir placeholders dos heroes das páginas internas por fotos reais
- [ ] Adicionar `og:image` nas meta tags de todas as páginas
- [ ] Definir velocidade final do vídeo nos cards (`playbackRate` em `main.js`)
- [ ] Testar responsividade em dispositivos reais
- [ ] Deploy na Hostinger (`public_html/`)

---

## Contatos / Links do Projeto

- **WhatsApp TNTFIT:** (11) 9 1717-3262
- **E-mail:** sac@tntfit.com.br
- **Instagram:** @tntfitpaulaferreira
- **CNPJ:** 52.024.076/0001-50
- **Domínio previsto:** tntfit.com.br
