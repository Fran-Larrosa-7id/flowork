import { computed, Injectable, signal } from "@angular/core";

@Injectable({
    providedIn: 'root'
})
export class RolService {
    private _roleUser = signal<string>(this.getInitialRole());
    readonly roleUser$ = computed(() => this._roleUser());

    private getInitialRole(): string {
        return localStorage.getItem('role') || '';
    }

    /**
     * Establece el rol del usuario
     * @param role El nuevo rol del usuario
     */
    setRole(role: string) {
        this._roleUser.set(role);
        localStorage.setItem('role', role);
    }
    
    /**
     * Limpia el rol del usuario
     */
    clearRole() {
        this._roleUser.set('');
        localStorage.removeItem('role');
    }
}