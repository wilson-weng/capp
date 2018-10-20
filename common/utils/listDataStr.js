
export const handleListDataStr = listToHandle => {
  let tempList = [];
  let lastMonth = listToHandle.length
    ? new Date(
    listToHandle[listToHandle.length - 1].record_date,
  ).getMonth() + 1
    : 0;

  listToHandle.map((record, index) => {
    let date = new Date(record.record_date);
    let month = date.getMonth() + 1;

    if (month !== lastMonth || index === 0) {
      tempList.push({
        scale: 'month',
        data: `${date.getFullYear()}年${month}月`,
      });
      lastMonth = month;
    }
    tempList.push({
      ...record,
      handled_data_str: record.date_str && record.date_str.split("月")[1] || ''
    });
  });

  return tempList
}
