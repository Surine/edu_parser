function parser() {
    timeTable = []
    for (i = 0; i < 84; i = i + 2) { // 7天*12小节
        classID = "TD" + i + "_0" // 生成课程表格对应id
        htmlInnerString = ($("#" + classID).html() + "<br>")// 获得内容，添加<br>标签方便用正则切割
        if (htmlInnerString != '<br>') { // 判断是否有课程
            var list = htmlInnerString.match(/.*?<br>/g) // 分块处理
            for (j in list) { // 遍历列表
                if (j % 2 == 0) {
                    var { name, teacher, day, sectionStart } = newFunction0()
                }
                else {
                    var { position, week } = newFunction1() // 不要吐槽这两函数命名，又不是不能用
                    array = { "name": name[0].trim(), "position": position, "teacher": teacher[0].trim(), "day": day, "sectionStart": sectionStart, "sectionContinue": 2, "week": String(week), }
                    timeTable.push(array)
                }
            }
        }
    }
    return timeTable

    function newFunction1() {
        if (/[,].*[)]/g.test(list[j])) { // 判断有无教室地址
            position = /[,].*[)]/g.exec(list[j])[0]
            var position = position.substring(1, position.length - 1)
        } // 存在教室地址，裁切并返回
        else {
            var position = ""
        } // 没有地址，返回空值
        week = []
        weekList = list[j].match(/(^|\s+|(?<=\())\d+(?![-\d])/g)
        for (k in weekList) {
            week.push(parseInt(weekList[k])) 
        } // 提取单数字周数并塞入列表
        if (/\d*-\d*/.test(list[j])) {
            rangeOfWeek = list[j].match(/\d*-\d*/g)
            for (k in rangeOfWeek) {
                l = rangeOfWeek[k].match(/\d+/g)
                a = parseInt(l[0])
                b = parseInt(l[1])
                while (a <= b) {
                    week.push(a)
                    a++
                }
            }
        }//提取1-18这类型的上课周数
        return { position, week }
    }

    function newFunction0() {
        teacher = /^.*?\s/g.exec(list[j]) // 教师名
        name = /\s.*?[)]/g.exec(list[j]) // 课程名
        day = parseInt((i + 1) / 12 + 1) // 星期几
        sectionStart = ((i + 1) % 12) // 第几节课
        return { name, teacher, day, sectionStart }
    }
}