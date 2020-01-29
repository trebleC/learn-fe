var i  = 0;

var timeStart = Date.now()
while (i++ < 1e4) {
    db.user.insert({name: 'quanquan' + i, age: i + 10})
}

print(Date.now() - timeStart)

// 耗时: 3821