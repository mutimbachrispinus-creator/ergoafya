export function env(...names: string[]) {
  for (const name of names) {
    const value = process.env[name]
    if (value) return value
  }
  return ''
}

export function envAny(name: string) {
  return env(name, name.toLowerCase())
}
