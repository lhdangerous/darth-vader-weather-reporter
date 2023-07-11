// A버튼 눌리면 기준 습도 올림
input.onButtonPressed(Button.A, function () {
    threshold += 3
    basic.showNumber(threshold)
    basic.pause(2000)
})
// B버튼 눌리면 기준습도 낮춤
input.onButtonPressed(Button.B, function () {
    threshold += -3
    basic.showNumber(threshold)
    basic.pause(2000)
})
// 시작시 서보상태 체크를 위해 한번 왕복운동
let humid = 0
let threshold = 0
pins.servoWritePin(AnalogPin.P12, 180)
basic.showNumber(1)
pins.servoWritePin(AnalogPin.P12, 0)
basic.showNumber(1)
pins.servoWritePin(AnalogPin.P12, 180)
// 습도 쓰레스홀드 기본값
threshold = 65
basic.forever(function () {
    dht11_dht22.queryData(
    DHTtype.DHT11,
    DigitalPin.P8,
    false,
    false,
    true
    )
    humid = dht11_dht22.readData(dataType.humidity)
    basic.showString("" + (humid))
    if (humid < threshold) {
        pins.servoWritePin(AnalogPin.P12, 180)
    } else {
        pins.servoWritePin(AnalogPin.P12, 0)
    }
    // 센서 에러시 노티
    if (!(dht11_dht22.sensorrResponding())) {
        basic.showIcon(IconNames.Sad)
        basic.pause(5000)
    }
})
