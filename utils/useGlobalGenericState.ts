export const useGlobalGenericState = <TState>(
  stateKey: string,
  initialState: TState
) => {
  const state = useState<TState>(stateKey, () => initialState)

  const setState = (newValue: TState) => {
    state.value = newValue
  }

  return [state, setState] as const
}
