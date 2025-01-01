import type { Phases } from '../../types'

abstract class Phase {
  protected abstract _name: Phases
  protected abstract _execute(): void
  /**
   * get name
   *
   * Read-only access to the phase name
   *
   * @returns Phases
   * */
  public get name(): Phases {
    return this._name
  }

  public execute(): void {
    this._execute()
  }
}

export { Phase }
