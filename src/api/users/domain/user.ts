export class User {
    constructor(
        readonly name: string,
        readonly lastName: string,
        readonly badgeNumber: string,
        readonly password: string,
        readonly role: string
    ){}
}

export enum ERole {
    "Policía" = "Policía",
    "Policía Tercero" = "Policía Tercero",
    "Policía Segundo" = "Policía Segundo",
    "Policía Primero" = "Policía Primero",
    "Policía Tercera" = "Policía Tercera",
    "Policía Segunda" = "Policía Segunda",
    "Policía Primera" = "Policía Primera",
    "Suboficial" = "Suboficial",
    "Segundo Suboficial" = "Segundo Suboficial",
    "Oficial" = "Oficial",
    "Primer Suboficial" = "Primer Suboficial",
    "Subinspector" = "Subinspector",
    "Subinspectora" = "Subinspectora",
    "Inspector" = "Inspector",
    "Inspectora" = "Inspectora",
    "Segundo Inspector" = "Segundo Inspector",
    "Inspectora Jefe" = "Inspectora Jefe",
    "Inspector Jefe" = "Inspector Jefe",
    "Primer Inspector" = "Primer Inspector",
    "Inspector General" = "Inspector General",
    "Inspectora General" = "Inspectora General",
    "Segundo Superintendente" = "Segundo Superintendente",
    "Comisario" = "Comisario",
    "Comisaria" = "Comisaria",
    "Primer Superintendente" = "Primer Superintendente",
    "Comisario Jefe" = "Comisario Jefe",
    "Comisaria Jefe" = "Comisaria Jefe",
    "Superintendente General" = "Superintendente General",
    "Comisario General" = "Comisario General",
    "Comisaria General" = "Comisaria General",
    "Becario" = "Becario",
    "Becaria" = "Becaria",
}