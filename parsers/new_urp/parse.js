function parser() {
  let result = [];
  $.each($("#infoTable").find("tr"), function (i, e) {
    let tds = $(e).find("td");
    // 如果找到的tds只有两个，说明是一节可有多个上课时间段
    if (tds.length == 2) {
      plan = $(tds[0]).text().split(">>");
      let copy = result.at(-1);
      result.push({
        name: copy.name,
        teacher: copy.teacher,
        position: $(tds[1]).text(),
        week: mapWeek(plan[1]),
        //todo: 完成周
      });
    } else {
      plan = $(tds[12]).text().split(">>");
      result.push({
        name: $(tds[1]).text(),
        teacher: $(tds[9]).text(),
        position: $(tds[13]).text().replace('','>>'),
        info: plan[0],
        week: mapWeek(plan[1]),
        info3: plan[2],
      });
    }
  });
  console.log(result);
}



// 用来获取周数字，提供了几个模版
function mapWeek(str) {
  let tpl1 = [
    "星期一",
    "星期二",
    "星期三",
    "星期四",
    "星期五",
    "星期六",
    "星期日",
  ];
  let tpl2 = ["周一", "周二", "周三", "周四", "周五", "周六", "周日"];
  let tpl3 = ["一", "二", "三", "四", "五", "六", "日"];
  return Math.max(tpl1.indexOf(str), tpl2.indexOf(str), tpl3.indexOf(str)) + 1;
}