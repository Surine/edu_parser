function parser() {
  let result = []

  let tab = document.querySelector('.CourseFormTable')
  for (let index = 1; index < tab.rows.length; index++) {
    let row = tab.rows[index]
    for (let m = 2; m < row.cells.length; m++) {
      let cell = row.cells[m]
      let text = cell.innerText
      // 去除空白
      let reg = /^\s+$/g
      if (reg.test(text)) continue

      let infos = cell.innerText.split(/[\r\n ]/g)
      for (let n = 0; n < parseInt(infos.length / 6); n++) {
        let course = {
          name: infos[0 + 6 * n].replaceAll(/\s/g, ''),
          position: infos[4 + 6 * n] + infos[5 + 6 * n],
          teacher: infos[3 + 6 * n],
          day: m - 1,
          sectionStart: parseStart(infos[2 + 6 * n]),
          sectionContinue: parseContinue(infos[2 + 6 * n]),
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
  let nums = str.match(/(\S*)周/)[1].split('-')
  let sigle = str.indexOf('单') > -1
  let double = str.indexOf('双') > -1
  for (let index = parseInt(nums[0]); index < parseInt(nums[1]) + 1; index++) {
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

function parseStart(str) {
  return parseInt(str.match(/第(\S*)节/)[1].split('-')[0])
}

function parseContinue(str) {
  return parseInt(str.match(/第(\S*)节/)[1].split('-')[1]) - parseStart(str) + 1
}
