from pathlib import Path
from pypdf import PdfReader

source = Path("output/pdf/notas-del-orador-seo-aeo.pdf")
destination = Path("tmp/audio/guia-completa-seo-aeo.txt")
destination.parent.mkdir(parents=True, exist_ok=True)

ignored = {
    "RE:START  |  SEO + AEO PARA CREADORES",
    "RE:START | SEO + AEO PARA CREADORES",
}

pages = []
for page in PdfReader(source).pages:
    lines = []
    for raw_line in (page.extract_text() or "").splitlines():
        line = raw_line.strip()
        if not line or line in ignored or line.isdigit():
            continue
        lines.append(line)
    pages.append("\n".join(lines))

intro = """Hola. Esta es la guía de preparación para impartir la clase SEO y AEO para creadores.

La sesión utiliza estados financieros como ejemplo conductor. Escúchala como una referencia de ritmo, tono y secuencia. No necesitas memorizar cada frase. Quédate con la intención de cada intervención, las preguntas para el grupo y la forma de cerrar cada actividad.

Comenzamos.

"""

text = intro + "\n\n".join(pages)
text = text.replace("DIAPOSITIVA:", "Para la diapositiva de")
text = text.replace("ANTES / MEJOR", "antes y mejor")
text = text.replace("A1 |", "Actividad uno.")
text = text.replace("A2 |", "Actividad dos.")
text = text.replace("A3 |", "Actividad tres.")
text = text.replace("A4 |", "Actividad cuatro.")
text = text.replace("SEO + AEO", "SEO y AEO")

destination.write_text(text, encoding="utf-8")
print(destination)
