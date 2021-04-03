export default function styledBy<TProperty extends string>(
  property: TProperty
): (props: Record<TProperty, string>) => typeof props[TProperty]

export default function styledBy<
  TProperty extends string,
  TMapping extends Record<string, unknown>
>(
  property: TProperty,
  mapping: TMapping
): (
  props: Record<TProperty, keyof typeof mapping>
) => TMapping[typeof props[TProperty]]

export default function styledBy<
  TProperty extends string,
  TMapping extends Record<string, unknown>
>(
  property: TProperty,
  mapping?: TMapping
): (
  props: Record<TProperty, keyof typeof mapping>
) => TMapping[typeof props[TProperty]] | typeof props[TProperty] {
  return (props) =>
    mapping != null ? mapping[props[property]] : props[property]
}
