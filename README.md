# Veusl Estúdio de Beleza

Site institucional estático (HTML/CSS/JS, sem build). Os arquivos publicados ficam em `dist/`.

## Vercel

Importar a raiz do repositório com framework **Other**. O `vercel.json` define a saída `dist`, sem build nem
instalação. `.vercelignore` exclui metadados locais (`.aroe-crm.json`, `.taste-skill/`).

## Dados usados

Fonte: lead do AROE CRM (`.aroe-crm.json`, cadastrado em 18/11/2026).

| Campo | Valor |
|---|---|
| Nome | Veusl Estúdio de Beleza |
| WhatsApp | (21) 96566-8408 (`wa.me/5521965668408`, número do CRM sem alteração) |

## PENDENTE antes de considerar o site completo

- **Localização / mapa:** sem endereço nem cidade confirmados; a seção `#atendimento` está sem mapa (comentário `PENDENTE` no HTML).
- Serviços: os textos partem do nome da empresa e convidam a consultar pelo WhatsApp. Confirmar a lista real.
- Horário de atendimento, logo e fotos reais.
- Número para ligação: só o WhatsApp foi informado; não há botão de ligar.

## Direção visual (Taste)

- Direção sorteada: *The place carries it (paleta Soot and lime; Barlow Condensed + Barlow)*. Ideia: o ambiente do estúdio conduz a página, com fotos grandes e o agendamento como ação principal.
- Hero no padrão obrigatório Aroe (`.agents/skills/aroe-sites/references/hero.md`), com as exceções do Taste
  documentadas só na hero: palavra do título em itálico na cor de acento, contornos no CTA do topo e no botão
  secundário, dois CTAs, barra transparente e camada escura neutra (marcadas com `taste-skill-ignore`).
- Item interativo: montador de agendamento (serviço, período e dia) em `#contato`.

## Imagens

Fotos ilustrativas do Unsplash (licença Unsplash, uso comercial permitido). Não mostram trabalhos, equipe nem
estabelecimento da empresa; a galeria informa isso. Créditos em `dist/assets/credits.md` e em
`dist/assets/credits.html` (link no rodapé).
