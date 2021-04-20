import {
  DocumentNode,
  FragmentSpreadNode,
  OperationDefinitionNode,
} from 'graphql'

export function getOperationName(ast: DocumentNode): string {
  const operation = ast.definitions[0] as OperationDefinitionNode
  const fragment = operation.selectionSet.selections[0] as FragmentSpreadNode
  const name = fragment.name.value

  return name
}

export function getOperationType(ast: DocumentNode): string {
  const operation = ast.definitions[0] as OperationDefinitionNode
  const type = operation.operation

  return type
}
