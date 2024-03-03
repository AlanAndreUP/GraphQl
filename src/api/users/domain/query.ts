export type IQuery = {
    getUser: (badgeNumber: string) => Promise<any>
    getUsers: (page: number, limit: number) => Promise<any> //paginación 1
    getListOfUsersByRole: (role: string) => Promise<any> //paginacion 2
}