from reportlab.lib import colors
from reportlab.lib.enums import TA_CENTER, TA_LEFT
from reportlab.lib.pagesizes import A4
from reportlab.lib.styles import ParagraphStyle, getSampleStyleSheet
from reportlab.lib.units import mm
from reportlab.platypus import PageBreak, Paragraph, SimpleDocTemplate, Spacer, Table, TableStyle
from pathlib import Path

OUT = Path("output/pdf/notas-del-orador-seo-aeo.pdf")
OUT.parent.mkdir(parents=True, exist_ok=True)

RED = colors.HexColor("#FF174B")
GREEN = colors.HexColor("#00E5A8")
BLACK = colors.HexColor("#050505")
DARK = colors.HexColor("#121212")
GRAY = colors.HexColor("#666666")
LIGHT = colors.HexColor("#F3F3F3")

styles = getSampleStyleSheet()
title = ParagraphStyle("TitleRestart", parent=styles["Title"], fontName="Helvetica-Bold", fontSize=29, leading=31, textColor=colors.white, alignment=TA_LEFT, spaceAfter=8)
h1 = ParagraphStyle("H1Restart", parent=styles["Heading1"], fontName="Helvetica-Bold", fontSize=19, leading=22, textColor=BLACK, spaceAfter=8)
h2 = ParagraphStyle("H2Restart", parent=styles["Heading2"], fontName="Helvetica-Bold", fontSize=11, leading=14, textColor=RED, spaceBefore=8, spaceAfter=4)
body = ParagraphStyle("BodyRestart", parent=styles["BodyText"], fontName="Helvetica", fontSize=9.2, leading=13, textColor=colors.HexColor("#262626"), spaceAfter=5)
small = ParagraphStyle("SmallRestart", parent=body, fontSize=7.5, leading=10, textColor=GRAY)
white = ParagraphStyle("WhiteRestart", parent=body, textColor=colors.white)
green = ParagraphStyle("GreenRestart", parent=body, textColor=GREEN, fontName="Helvetica-Bold")
center = ParagraphStyle("CenterRestart", parent=small, alignment=TA_CENTER)

concepts = [
    {
        "n": "01", "name": "SEO: ayudar al buscador a decidir", "time": "10 min",
        "idea": "SEO organiza las señales de una pieza para que un buscador entienda qué pregunta responde y cuándo conviene mostrarla.",
        "say": "Aclara el vocabulario desde el inicio: el navegador abre páginas; el buscador encuentra y ordena respuestas. La idea no es engañar a Google, YouTube o TikTok, sino reducir la ambigüedad entre la necesidad de una persona y nuestro contenido.",
        "visual": "Usa la imagen del robot clasificador. Señala tres momentos: entender el tema, clasificar la intención y mostrar la pieza a la persona adecuada.",
        "compare": "ANTES: publicar y esperar que Google adivine. MEJOR: definir primero una pregunta y alinear título, texto, audio y desarrollo.",
        "ask": "Si mañana tuvieras que presentar un Estado de Resultados, ¿qué escribirías exactamente en el buscador?",
        "expected": "Frases con una acción concreta, por ejemplo: cómo leer un Estado de Resultados paso a paso.",
        "transition": "Si hoy buscamos claridad, conviene entender por qué antes se hablaba tanto de trucos técnicos."
    },
    {
        "n": "02", "name": "Las técnicas que antes lo eran todo", "time": "10 min",
        "idea": "Las bases técnicas siguen importando, pero repetir términos o acumular enlaces ya no sustituye una respuesta útil.",
        "say": "Explica que el SEO antiguo medía señales fáciles de contar: densidad de keywords, etiquetas y volumen de enlaces. Los sistemas actuales añaden contexto, calidad, autoridad y comportamiento humano. No declares muerto el SEO técnico: preséntalo como infraestructura.",
        "visual": "Muestra la caja de herramientas. Cada herramienta sirve si resuelve un problema: indexación, velocidad, enlaces comprensibles o estructura. Una herramienta no es la estrategia completa.",
        "compare": "ANTES: repetir estados financieros en cada párrafo. MEJOR: resolver una pregunta concreta con profundidad y naturalidad.",
        "ask": "¿Qué trucos de posicionamiento han escuchado? ¿Son base, práctica obsoleta o dependen del uso?",
        "expected": "Distinguir una base útil de una acción mecánica sin propósito para la audiencia.",
        "transition": "La siguiente decisión no es cuántas veces repetir una palabra, sino qué quiere lograr quien la busca."
    },
    {
        "n": "03", "name": "Intención de búsqueda", "time": "10 min",
        "idea": "Una misma temática puede pedir definición, proceso, comparación o herramienta.",
        "say": "Haz que el grupo complete esta frase: después de ver mi contenido, la persona podrá... Esa respuesta define formato y profundidad. Una keyword popular no sirve si el video promete algo distinto de lo que la persona necesita.",
        "visual": "Contrasta aprender, hacer y obtener. Para estados financieros: qué son; cómo leerlos; descargar una plantilla.",
        "compare": "ANTES: usar el mismo video para cualquier búsqueda financiera. MEJOR: cambiar formato y profundidad según el objetivo de la persona.",
        "ask": "¿Qué video distinto harías para definición, proceso y plantilla?",
        "expected": "Una explicación breve, un tutorial paso a paso y un recurso descargable.",
        "transition": "Cuando la intención está clara, podemos escribir una frase que una persona realmente usaría."
    },
    {
        "n": "04", "name": "Palabras clave que suenan humanas", "time": "10 min",
        "idea": "Acción + tema + contexto transforma una categoría amplia en una búsqueda utilizable.",
        "say": "No presentes la keyword como una contraseña exacta. Es una hipótesis sobre el lenguaje de la audiencia. Se valida observando autocompletado, preguntas, comentarios y resultados actuales.",
        "visual": "Construye en vivo: cómo leer + estados financieros + paso a paso para emprendedores. Borra una parte y pregunta cómo cambia la promesa.",
        "compare": "ANTES: finanzas empresas información. MEJOR: cómo leer estados financieros paso a paso.",
        "ask": "¿Qué palabra cambia más la expectativa: cómo, leer o paso a paso?",
        "expected": "Cómo señala formato; leer señala acción; paso a paso señala profundidad y ritmo.",
        "transition": "La keyword tiene que sobrevivir fuera del título: también debe aparecer de forma coherente dentro del video."
    },
    {
        "n": "05", "name": "Cómo lee un video el algoritmo", "time": "10 min",
        "idea": "Audio, texto, metadatos y respuesta de la audiencia construyen una señal conjunta.",
        "say": "Separa señales editoriales de señales de experiencia. Las primeras explican el tema; retención, repetición, guardados y compartidas sugieren si se cumplió la promesa. Ninguna señal aislada rescata una pieza incoherente.",
        "visual": "Recorre cinco lugares: frase hablada, texto en pantalla, título, descripción y desarrollo. Después añade la reacción de la audiencia.",
        "compare": "ANTES: título sobre ahorro y apertura sobre inteligencia artificial. MEJOR: audio, texto y desarrollo confirman la misma promesa.",
        "ask": "Sin leer el título, ¿qué inferiría la plataforma de los primeros cinco segundos?",
        "expected": "Tema, formato, audiencia probable y si la pieza empieza a responder pronto.",
        "transition": "TikTok usa estas mismas pistas, pero las combina con un buscador diseñado alrededor del video corto."
    },
    {
        "n": "06", "name": "El buscador de TikTok", "time": "10 min",
        "idea": "TikTok relaciona la consulta con lo que se dice, muestra y escribe, y luego aprende de la reacción de la audiencia.",
        "say": "Evita reducir TikTok SEO a hashtags. Explica que la plataforma puede leer audio, texto en pantalla, caption, tema de cuenta y patrones de consumo. Los hashtags específicos ayudan a contextualizar; #fyp no describe una necesidad.",
        "visual": "Dibuja la ruta: consulta -> señales del video -> prueba con audiencia -> ajuste del orden de resultados.",
        "compare": "ANTES: depender de #fyp y #viral. MEJOR: nombrar la pregunta en audio, pantalla y caption, y responderla pronto.",
        "ask": "¿Qué tres elementos conectarían un reel con la búsqueda cómo leer un estado de resultados?",
        "expected": "La frase hablada, texto visible y caption específico, acompañados por una respuesta clara.",
        "transition": "Ser comprensible ayuda a entrar al conjunto de respuestas; la autoridad ayuda a merecer confianza."
    },
    {
        "n": "07", "name": "Autoridad y presencia", "time": "10 min",
        "idea": "La confianza se construye con experiencia demostrable, fuente identificable, referencias y consistencia.",
        "say": "Resume el SEO actual en contenido, autoridad y presencia. Contenido responde; autoridad demuestra por qué creer; presencia hace esa evidencia visible en espacios relevantes. Añade que rapidez, seguridad y móvil siguen siendo la base técnica.",
        "visual": "Sube por capas: contenido útil, evidencia, autor identificable y presencia consistente. Pregunta qué capa falta en un artículo anónimo.",
        "compare": "ANTES: artículo genérico sin autor, ejemplos ni referencias. MEJOR: experiencia propia, fuente identificable y datos verificables.",
        "ask": "¿Qué demuestra experiencia real y qué solo hace que una pieza parezca profesional?",
        "expected": "Casos propios, metodología, límites, datos y fuentes verificables demuestran más que un diseño pulido.",
        "transition": "Cuando una fuente es clara y verificable, también resulta más fácil para una IA extraer y citar su respuesta."
    },
    {
        "n": "08", "name": "AEO: respuestas citables", "time": "10 min",
        "idea": "AEO estructura respuestas directas, específicas y verificables para motores que responden en lugar de listar enlaces.",
        "say": "Conecta AEO con SEO: no lo reemplaza. Una página primero debe poder encontrarse; después, su respuesta debe poder entenderse y atribuirse. Ayudan preguntas explícitas, resumen inicial, listas, tablas y evidencia cercana.",
        "visual": "Muestra cómo varias fuentes claras convergen en una respuesta. Subraya que la atribución depende de que la fuente sea identificable.",
        "compare": "ANTES: introducción larga antes de responder. MEJOR: respuesta directa primero, evidencia y explicación después.",
        "ask": "Respondan en dos oraciones: ¿cuáles son los tres estados financieros clave?",
        "expected": "Balance General, Estado de Resultados y Flujo de Efectivo; después, una frase sobre la función de cada uno.",
        "transition": "Cerramos llevando toda la claridad acumulada a una pieza lista para publicar."
    },
]

activities = [
    {
        "n": "A1", "name": "Base técnica o truco obsoleto", "time": "10 min",
        "goal": "Distinguir fundamentos, tácticas mecánicas e ideas que dependen del contexto.",
        "steps": "1. Proyecta una práctica. 2. El grupo vota base, truco o depende. 3. Pide una justificación centrada en la experiencia de búsqueda. 4. Reformulen la práctica.",
        "example": "Título descriptivo = base. Sitio móvil y rápido = base. Treinta hashtags genéricos = táctica riesgosa. Keyword repetida 18 veces = truco obsoleto. Respuesta firmada por una persona experta = señal vigente de autoridad.",
        "deliverable": "Regla del grupo: esta técnica sirve cuando ayuda a comprender, acceder o verificar la respuesta."
    },
    {
        "n": "A2", "name": "De tema amplio a búsqueda útil", "time": "12 min",
        "goal": "Convertir un tema en consultas alineadas con distintas intenciones.",
        "steps": "1. Divide en tres equipos: aprender, hacer y obtener. 2. Todos parten de estados financieros. 3. Añaden acción y contexto. 4. Leen la frase como si fueran la audiencia. 5. El grupo elige la promesa más clara.",
        "example": "Aprender: qué son los estados financieros para emprendedores. Hacer: cómo leer un Estado de Resultados paso a paso. Obtener: plantilla de Estado de Resultados en Excel para negocio pequeño.",
        "deliverable": "Una keyword natural y una oración que explique por qué coincide con la intención."
    },
    {
        "n": "A3", "name": "Auditoría del buscador de TikTok", "time": "15 min",
        "goal": "Reconocer patrones reales sin convertirlos en una fórmula rígida.",
        "steps": "1. Escribe cómo leer un estado de resultados sin terminar la frase. 2. Lee el autocompletado. 3. Abre tres resultados. 4. Observa solo los primeros cinco segundos. 5. Registra audio, texto, caption, formato y promesa.",
        "example": "Patrón sugerido: pregunta visible en el primer segundo, ejemplo numérico en pantalla, explicación en tres pasos y CTA para guardar. Aclara que es una observación, no una garantía del algoritmo.",
        "deliverable": "Tres patrones aplicables y una decisión que el equipo no copiará porque no encaja con su audiencia."
    },
    {
        "n": "A4", "name": "De keyword a pieza publicable", "time": "18 min",
        "goal": "Crear una cadena coherente entre búsqueda, título, pantalla y apertura hablada.",
        "steps": "1. Evalúa la keyword. 2. Redacta título y texto en pantalla. 3. Ensaya una apertura de 15 segundos. 4. Comprueba que una persona reconozca en cinco segundos que llegó al video correcto.",
        "example": "Keyword: cómo leer un Estado de Resultados paso a paso para emprendedores. Título: Cómo leer un Estado de Resultados sin ser contador. Pantalla: Lee tu Estado de Resultados en 3 pasos. Apertura: Si tienes ventas pero no sabes si realmente ganas dinero, en el próximo minuto veremos ingresos, costos y utilidad con un ejemplo sencillo.",
        "deliverable": "Keyword + título + texto en pantalla + apertura de 15 segundos."
    },
]

def footer(canvas, doc):
    canvas.saveState()
    canvas.setFillColor(BLACK)
    canvas.rect(0, 0, A4[0], 12 * mm, fill=1, stroke=0)
    canvas.setFillColor(RED)
    canvas.rect(0, A4[1] - 4 * mm, A4[0], 4 * mm, fill=1, stroke=0)
    canvas.setFont("Helvetica-Bold", 7)
    canvas.setFillColor(colors.white)
    canvas.drawString(18 * mm, 5 * mm, "RE:START  |  SEO + AEO PARA CREADORES")
    canvas.setFillColor(GREEN)
    canvas.drawRightString(A4[0] - 18 * mm, 5 * mm, f"{doc.page}")
    canvas.restoreState()

doc = SimpleDocTemplate(str(OUT), pagesize=A4, rightMargin=18*mm, leftMargin=18*mm, topMargin=17*mm, bottomMargin=18*mm)
story = []

cover = Table([[Paragraph("RE:START", title), Paragraph("NOTAS DEL ORADOR", green)], [Paragraph("SEO + AEO para creadores", white), Paragraph("Sesión guiada de 150 minutos", white)]], colWidths=[108*mm, 62*mm], rowHeights=[42*mm, 22*mm])
cover.setStyle(TableStyle([("BACKGROUND",(0,0),(-1,-1),BLACK),("BOX",(0,0),(-1,-1),1,RED),("VALIGN",(0,0),(-1,-1),"MIDDLE"),("LEFTPADDING",(0,0),(-1,-1),10*mm),("RIGHTPADDING",(0,0),(-1,-1),8*mm),("LINEBEFORE",(1,0),(1,-1),1,RED)]))
story += [Spacer(1,35*mm), cover, Spacer(1,18*mm), Paragraph("Guía completa para presentar cada idea, apoyo visual y comparación Antes / Mejor. Incluye preguntas, respuestas esperadas, transiciones y cuatro actividades resueltas.", body), Spacer(1,8*mm)]
route_data = [[Paragraph("TRAMO", h2), Paragraph("MINUTOS", h2), Paragraph("CONTENIDO", h2)], ["Abrir", "0-10", "Diagnóstico y objetivo"], ["Entender", "10-40", "SEO, técnicas anteriores y A1"], ["Enfocar", "40-72", "Intención, keywords y A2"], ["Pausa", "72-82", "Receso"], ["Descubrir", "82-117", "Señales, TikTok y A3"], ["Convertir", "117-150", "Autoridad, AEO y A4"]]
route = Table(route_data, colWidths=[38*mm,28*mm,104*mm])
route.setStyle(TableStyle([("BACKGROUND",(0,0),(-1,0),DARK),("TEXTCOLOR",(0,0),(-1,0),colors.white),("GRID",(0,0),(-1,-1),.4,colors.HexColor("#CCCCCC")),("FONTNAME",(0,1),(-1,-1),"Helvetica"),("FONTSIZE",(0,1),(-1,-1),8),("ROWBACKGROUNDS",(0,1),(-1,-1),[colors.white,LIGHT]),("VALIGN",(0,0),(-1,-1),"MIDDLE"),("TOPPADDING",(0,0),(-1,-1),5),("BOTTOMPADDING",(0,0),(-1,-1),5)]))
story += [route, PageBreak()]

for item in concepts:
    story += [Paragraph(f"{item['n']}  |  {item['name']}", h1), Paragraph(f"TIEMPO SUGERIDO: {item['time']}", h2), Paragraph(item["idea"], body)]
    rows = [
        ("DIAPOSITIVA: IDEA", item["say"]),
        ("DIAPOSITIVA: APOYO VISUAL", item["visual"]),
        ("DIAPOSITIVA: ANTES / MEJOR", item["compare"]),
        ("PREGUNTA AL GRUPO", item["ask"]),
        ("RESPUESTA ESPERADA", item["expected"]),
        ("TRANSICIÓN", item["transition"]),
    ]
    for label, text_value in rows:
        story += [Paragraph(label, h2), Paragraph(text_value, body)]
    story += [Spacer(1,3*mm), Paragraph("Consejo de facilitación: no leas la pantalla. Usa la imagen para hacer una pregunta, escucha dos respuestas y después completa la explicación.", small), PageBreak()]

activity_cover = Table([[Paragraph("ACTIVIDADES PRÁCTICAS", title)], [Paragraph("Dinámicas listas para Zoom, con instrucciones, ejemplo resuelto y entregable.", white)]], colWidths=[170*mm], rowHeights=[38*mm,22*mm])
activity_cover.setStyle(TableStyle([("BACKGROUND",(0,0),(-1,-1),BLACK),("BOX",(0,0),(-1,-1),1,GREEN),("VALIGN",(0,0),(-1,-1),"MIDDLE"),("LEFTPADDING",(0,0),(-1,-1),10*mm),("RIGHTPADDING",(0,0),(-1,-1),10*mm)]))
story += [Spacer(1,55*mm), activity_cover, Spacer(1,8*mm), Paragraph("Úsalas por chat, micrófono o salas pequeñas. Cada actividad incluye una solución modelo para destrabar al grupo sin convertirla en la única respuesta correcta.", body), PageBreak()]
for activity in activities:
    story += [Paragraph(f"{activity['n']}  |  {activity['name']}", h1), Paragraph(f"TIEMPO: {activity['time']}", h2), Paragraph(activity["goal"], body), Paragraph("CÓMO FACILITARLA", h2), Paragraph(activity["steps"], body), Paragraph("EJEMPLO SUGERIDO / SOLUCIÓN MODELO", h2), Paragraph(activity["example"], body), Paragraph("ENTREGABLE", h2), Paragraph(activity["deliverable"], body), Spacer(1,8*mm)]
    box = Table([[Paragraph("Pregunta de cierre", green), Paragraph("¿La persona sabría en cinco segundos que llegó al contenido correcto?", white)]], colWidths=[44*mm,126*mm])
    box.setStyle(TableStyle([("BACKGROUND",(0,0),(-1,-1),DARK),("BOX",(0,0),(-1,-1),1,GREEN),("VALIGN",(0,0),(-1,-1),"MIDDLE"),("LEFTPADDING",(0,0),(-1,-1),7),("RIGHTPADDING",(0,0),(-1,-1),7),("TOPPADDING",(0,0),(-1,-1),9),("BOTTOMPADDING",(0,0),(-1,-1),9)]))
    story += [box, PageBreak()]

story += [Paragraph("CIERRE DE LA SESIÓN", h1), Paragraph("Pide a cada equipo leer únicamente su keyword, título y apertura. El resto del grupo responde con una sola palabra: claro, ambiguo o distinto. Si aparece ambiguo o distinto, cambien una sola pieza y vuelvan a probar.", body), Paragraph("Frase final sugerida", h2), Paragraph("SEO no empieza al publicar. Empieza cuando decides con precisión qué pregunta vas a resolver y haces que cada señal de la pieza confirme esa promesa.", body)]

doc.build(story, onFirstPage=footer, onLaterPages=footer)
print(OUT)
