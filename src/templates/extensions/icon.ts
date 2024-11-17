import { resolve } from 'path'
import { readFileSync } from 'fs'
import { Extension } from 'nunjucks'

/**
 * Represents a Nunjucks custom extension for handling inline SVG icons.
 *
 * @example
 * Usage in Nunjucks templates:
 * {% icon 'home' %}
 * {% icon 'home', { width: '24px', height: '24px', class: 'bg-red-300' } %}
 */
export default class IconExtension implements Extension {
  tags: string[]
  folderPath: string
  fileExt: string

  constructor(folderPath: string, fileExt: string = 'svg') {
    this.tags = ['icon']
    this.folderPath = folderPath
    this.fileExt = fileExt
  }

  parse(parser: any, nodes: any) {
    const tok = parser.nextToken()
    const args = parser.parseSignature(null, true)
    parser.advanceAfterBlockEnd(tok.value)
    return new nodes.CallExtension(this, 'run', args)
  }

  run(
    context: any,
    iconName: string,
    options: { width?: string; height?: string; class?: string } = {}
  ): string {
    const filePath = resolve(this.folderPath, `${iconName}.${this.fileExt}`)
    try {
      let svgContent = readFileSync(filePath, 'utf8')

      const { width, height, class: className } = options
      svgContent = svgContent.replace(/<svg([^>]*)>/, (_, attributes) => {
        let newAttributes = attributes

        if (width) newAttributes = this.updateAttribute(newAttributes, 'width', width)
        if (height) newAttributes = this.updateAttribute(newAttributes, 'height', height)
        if (className) newAttributes = this.updateAttribute(newAttributes, 'class', className)

        return `<svg ${newAttributes}>`
      })

      return context.env.filters.safe(svgContent)
    } catch (error) {
      console.error(`Error reading SVG file at ${filePath}:`, error)
      return `<svg><!-- Error loading icon: ${iconName} --></svg>`
    }
  }

  private updateAttribute(attributes: string, key: string, value: string): string {
    const regex = new RegExp(`\\b${key}="[^"]*"`)
    if (regex.test(attributes)) {
      return attributes.replace(regex, `${key}="${value}"`)
    } else {
      return `${attributes} ${key}="${value}"`.trim()
    }
  }
}
