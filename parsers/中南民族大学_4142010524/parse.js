function parser() {
  let result = []

  let tab = document.querySelector('.CourseFormTable')
  for (let index = 1; index < tab.rows.length; index++) {
    let row = tab.rows[index]
    for (let m = 2; m < row.cells.length; m++) {
      let cell = row.cells[m]
      let text = cell.innerText
      // 如果是空白则代表这个格子没课不进行解析
      if (/^\s+$/g.test(text)) continue

      let infos = text.split(/[\r\n ]+/g).map(item=>item.trim())
      for (let n = 0; n < parseInt(infos.length / 6); n++) {
        let section = parseSection(infos[2 + 6 * n])
        let course = {
          name: infos[0 + 6 * n],
          position: infos[4 + 6 * n] + infos[5 + 6 * n],
          teacher: infos[3 + 6 * n],
          day: m - 1,
          sectionStart: section.start,
          sectionContinue: section.continue,
          week: parseWeek(infos[1 + 6 * n]),
        }
        result.push(course)
      }
    }
  }
  return result
}

function parseWeek(str) {
  let result = []
  let [start, end] = str.match(/\d+/g).map(item => parseInt(item))
  let sigle = /\(单\)/.test(str)
  let double = /\(双\)/.test(str)
  for (let index = start; index <= end; index++) {
    if (
      (sigle && index % 2 == 1) ||
      (double && index % 2 == 0) ||
      (!sigle && !double)
    ) {
      result.push(index)
    }
  }
  return result.toString()
}

function parseSection(str) {
  let [start, end] = str.match(/\d+/g).map(item => parseInt(item))
  return { start, end, continue: end - start + 1 }
}
