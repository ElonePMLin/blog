import { readFileSync, readdirSync } from 'fs'

let svgPrefix = 'icon'  // 用于生成id的前缀
const svgAttr = /<svg([^>+].*?)>/  // 获取svg属性
const clearHeightWidth = /(width|height)="([^>+].*?)"/g  // 将高度和宽度置0，g将在整个字符串查找并返回所有匹配结果
const hasViewBox = /(viewBox="[^>+].*?")/g
const clearReturn = /(\r)|(\n)/g  // 格式化去换行

function findSvgFile(dir) {
    const svgRes = []
    const directories = readdirSync(dir, {
        withFileTypes: true
    })
    for (const directory of directories) {
        if (directory.isDirectory()) {  // 继续递归
            svgRes.push(...findSvgFile(dir + directory.name + '/'))
        } else {
            const svg = readFileSync(dir + directory.name)
                .toString()  // 内容字符串化
                .replace(clearReturn, '')  // 去除换行
                .replace(svgAttr, ($1, $2) => {
                    let width = 0; let height = 0;

                    // width、height置空
                    let content = $2.replace(clearHeightWidth, (s1, s2, s3) => {
                        if (s2 === 'width') {
                            width = s3
                        } else if (s2 === 'height') {
                            height = s3
                        }
                        return ''
                    })
                    
                    if (!hasViewBox.test($2)) {
                        content += `viewBox="0 0 ${width} ${height}"`
                    }
                    // svg替换为symbol
                    return `<symbol id="${svgPrefix}-${directory.name.replace('.svg', '')}" ${content}>`
                })
                .replace('</svg>', '</symbol>')
            svgRes.push(svg)
        }
    }
    return svgRes
}

export const svgLoader = (path, prefix='icon') => {
    if (path === '') return 
    svgPrefix = prefix
    const res = findSvgFile(path)
    return {
        name: 'svg-transform',
        transformIndexHtml(html) {
            return html.replace(
                '<body>',
                `
                <body>
                <svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" style="position: absolute; width: 0; height: 0">
                    ${res.join('')}
                </svg>
                `
            )
        }
    }
}

