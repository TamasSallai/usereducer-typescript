export enum Priority {
  Low = 'low',
  Medium = 'medium',
  High = 'high',
  Blocker = 'blocker',
}
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const isPriority = (option: any): option is Priority => {
  // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
  return Object.values(Priority).includes(option)
}

export interface Todo {
  id: number
  description: string
  isCompleted: boolean
  priority: Priority
}
