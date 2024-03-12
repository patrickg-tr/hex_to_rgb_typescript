class RGB {
  private readonly hexLetterVal: LetterConversion = {a: 10, b: 11, c: 12, d: 13, e: 14, f: 15}

  private convertSingleHexToRgb(x: string, y: string): number {
    if(this.hexLetterVal[x] || this.hexLetterVal[y] !== undefined) {
      const array: string[] = []
      this.hexLetterVal[x] ? array.push(this.hexLetterVal[x]) : array.push(x)
      this.hexLetterVal[y] ? array.push(this.hexLetterVal[y]) : array.push(y)
      return this.convertSingleHexToRgb(array[0], array[1])

    } else {
      return (parseInt(x) * 16) + parseInt(y)
    }
  }

  public getRgbvalue(hexArray: string[]): string {
    return hexArray.map(item => {
      const itemArray: string[] = item.split('')
      return this.convertSingleHexToRgb(itemArray[0], itemArray[1])
    }).toString()
  }

  public hexStrToArray(hex: string): string[] {
    return [hex.substring(1, 3), hex.substring(3, 5), hex.substring(5, 7)]
  }
}

class RbgElement extends RGB {
  hexArray: string[]
  className: string

  constructor(params: {hexVal: string}) {
    super()
    this.hexArray = this.hexStrToArray(params.hexVal)
  }

  set elemClass(name: string) {
    this.className = name
  }

  get spanElement(): HTMLElement {
    const newElem: HTMLElement = document.createElement('span')
    newElem.setAttribute('class', this.className)
    newElem.innerText = this.getRgbvalue(this.hexArray);

    return newElem
  }
}

const colorLists: Array<Element> = [...document.querySelectorAll('#story--ui-patterns-color-palette--default-inner .List-color')]

function loopThruLists(): void {
  if(!colorLists.length) { return }
  
	colorLists.forEach(item => {
    const elem: HTMLElement = item.querySelector('[class^=List-color-hex]')
    const hex: string = elem?.innerText.toString()
    
    const RgbElement = new RbgElement({hexVal: hex})
    RgbElement.elemClass = elem.classList.value.toString()
    elem.insertAdjacentElement('afterend', RgbElement.spanElement)
  })
}

(() => { loopThruLists() })();

interface LetterConversion {
  a: number,
  b: number,
  c: number,
  d: number,
  e: number,
  f: number,
}
