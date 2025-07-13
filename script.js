window.addEventListener("DOMContentLoaded", () => {
  const materiasPorSemestre = {
    1: [
      { id: "FIS100", nombre: "Física I", prereq: [] },
      { id: "INF110", nombre: "Intro. a la Informática", prereq: [] },
      { id: "INF119", nombre: "Estructuras Discretas", prereq: [] },
      { id: "LIN100", nombre: "Inglés Técnico I", prereq: [] },
      { id: "MAT101", nombre: "Cálculo I", prereq: [] }
    ],
    2: [
      { id: "FIS102", nombre: "Física II", prereq: ["FIS100"] },
      { id: "INF120", nombre: "Programación I", prereq: ["INF110"] },
      { id: "LIN101", nombre: "Inglés Técnico II", prereq: ["LIN100"] },
      { id: "MAT102", nombre: "Cálculo II", prereq: ["MAT101"] },
      { id: "MAT103", nombre: "Álgebra Lineal", prereq: ["INF119"] }
    ],
    3: [
      { id: "ADM100", nombre: "Administración", prereq: [] },
      { id: "FIS200", nombre: "Física III", prereq: ["FIS102"] },
      { id: "INF210", nombre: "Programación II", prereq: ["MAT103", "INF120"] },
      { id: "INF211", nombre: "Arquitectura de Computadoras", prereq: ["FIS102", "INF120"] },
      { id: "MAT207", nombre: "Ecuaciones Diferenciales", prereq: ["MAT102"] }
    ],
4: 
    [
      { id: "ADM200", nombre: "Contabilidad", prereq: ["ADM100"] }, { id: "INF220", nombre: "Estructuras de Datos I", prereq: ["INF210"] }, { id: "INF221", nombre: "Programación en Ensamblador", prereq: ["INF211"] }, { id: "MAT202", nombre: "Prob. y Estad. I", prereq: ["MAT102"] }, { id: "MAT205", nombre: "Métodos numericos", prereq: ["MAT207"] } 
      ],

5:
      [
        { id: "ADM330", nombre: "Organización y Métodos", prereq: ["ADM200"] },{ id: "ECO300", nombre: "Economía para la gestión", prereq: ["ADM200"] }, { id: "INF312", nombre: "Base de Datos I", prereq: ["INF220"] }, { id: "MAT302", nombre: "Prob. y Estad. II", prereq: ["MAT202"] }, { id: "INF310", nombre: "Estructuras de Datos II", prereq: ["INF220"] }
        ],
6:
        [{ id: "MAT329", nombre: "Investigación Operativa I", prereq: ["MAT302"] }, { id: "INF322", nombre: "Base de Datos II", prereq: ["INF312"] }, { id: "INF323", nombre: "Sistemas Operativos I", prereq: ["INF310"] }, { id: "INF323", nombre: "Sistemas de Información I", prereq: ["INF310"] }, { id: "ADM320", nombre: "Finanzas para la Empresa", prereq: ["ADM330"] }
        ],
7:
        [{ id: "MAT419", nombre: "Investigación Operativa II", prereq: ["MAT329"] }, { id: "INF413", nombre: "Sistemas de Información II", prereq: ["INF323"] }, { id: "INF432", nombre: "Soporte para la Toma de Decisiones", prereq: ["INF322"] }, { id: "INF413", nombre: "Sistemas Operativos II", prereq: ["INF322", "INF342"] }, { id: "INF433", nombre: "Redes I", prereq: ["INF323"] }
          ],
8:
          [{ id: "ECO449", nombre: "Prep. y Eval. de Proyectos", prereq: ["MAT419"] }, { id: "INF423", nombre: "Redes II", prereq: ["INF433"] }, { id: "INF442", nombre: "Sistemas de Información Geográfica", prereq: ["INF412"] }, { id: "INF422", nombre: "Ingeniería de Software I", prereq: ["INF412"] }, { id: "INF462", nombre: "Auditoria Informatica", prereq: ["INF412", "ADM320"]}
          ],
9:
          [{ id: "INF511", nombre: "Taller de Grado I", prereq: ["ECO449", "INF423", "INF442", "INF422", "INF462"] }, { id: "INF512", nombre: "Ing. de Software II", prereq: ["ECO449", "INF423", "INF442", "INF422", "INF462"] }, { id: "INF513", nombre: "Tecnología Web", prereq: ["ECO449", "INF423", "INF442", "INF422", "INF462"] }, { id: "INF552", nombre: "Arquitectura de Software", prereq: ["ECO449", "INF423", "INF442", "INF422", "INF462"] }
          ],
10: [
  { id: "GRL001", nombre: "Modalidad de Titulación", prereq: ["INF511", "INF512", "INF513", "INF552"] }
]
};

  const contenedor = document.getElementById("malla-container");

  for (const [semestre, materias] of Object.entries(materiasPorSemestre)) {
    const caja = document.createElement("div");
    caja.className = "semestre";
    caja.innerHTML = `<h2>Semestre ${semestre}</h2>`;

    const malla = document.createElement("div");
    malla.className = "malla";

    materias.forEach(mat => {
      const div = document.createElement("div");
      div.className = "materia";
      div.id = mat.id;
      div.dataset.prereq = JSON.stringify(mat.prereq);
      div.textContent = `${mat.id}\n${mat.nombre}`;
      malla.appendChild(div);
    });

    caja.appendChild(malla);
    contenedor.appendChild(caja);
  }

  function actualizarMaterias() {
    document.querySelectorAll(".materia").forEach(div => {
      if (div.classList.contains("completada")) return;
      const prereqs = JSON.parse(div.dataset.prereq);
      const habilitada = prereqs.every(id =>
        document.getElementById(id)?.classList.contains("completada")
      );
      div.classList.toggle("habilitada", habilitada);
    });
  }

  contenedor.addEventListener("click", e => {
  const el = e.target;
  if (!el.classList.contains("materia")) return;

  // Si está completada, desmarcar
  if (el.classList.contains("completada")) {
    el.classList.remove("completada");
    actualizarMaterias(); // Actualiza desbloqueo de otras
    return;
  }

  // Si está habilitada, marcar como completada
  if (el.classList.contains("habilitada")) {
    el.classList.add("completada");
    el.classList.remove("habilitada");
    actualizarMaterias();
  }
});

  actualizarMaterias();
});