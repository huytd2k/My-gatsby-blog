---
title: Thử học golang... và một vài cảm nghĩ?
date: '2021-04-01'
spoiler: Than phiền (một chút) về golang
cta: 'golang'
---

Ngôn ngữ đầu tiên mà mình cảm thấy "thoải mái" nhất khi code chính là Typescript, sau khi vật lộn với JS và sự kì cục của nó, mình cảm thấy Typescript chính là sự cứu cánh với IDE support, static type,... 

Sướng quá thành quen, mãi đến bây giờ chưa thử sức với một ngôn ngữ mới nào khác. Ai cũng nói là phải "vượt qua vùng thoải mái" thì mới khá lên được? Thế nên cùng lúc đang thử học theo [Crafting Interpreters](https://craftinginterpreters.com/). Mình quyết định áp dụng Golang vào luôn :v

Và sau khi đọc xong chương đầu tiên, mình nhận ra, golang và mình không thể chung bước :(

## Thiếu Function Overloading và Argument default value

Khi implement một method cho struct `Scanner`, mình phải viết 2 function chỉ thực hiện một công việc: thêm thêm giá trị token vào mảng `scanner.Tokens`. 

```go
func (scanner *Scanner) addTokenWithLiteral(tkType tk.TokenType, literal interface{}) {
	text := string(scanner.source[scanner.start:scanner.current])
	scanner.Tokens = append(scanner.Tokens, tk.Token{tkType, text, literal, scanner.line})
}

func (scanner *Scanner) addToken(tkType tk.TokenType) {
	text := string(scanner.source[scanner.start:scanner.current])
	scanner.Tokens = append(scanner.Tokens, tk.Token{tkType, text, struct{}{}, scanner.line})
}
```


Công việc sẽ ngắn gọn hơn rất nhiều nếu golang có thể gán giá trị mặc định cho param, kiểu như thế này:

```go
func (scanner *Scanner) addToken(tkType tk.TokenType, literal interface{} = struct{}{}) {
	text := string(scanner.source[scanner.start:scanner.current])
	scanner.Tokens = append(scanner.Tokens, tk.Token{tkType, text, literal, scanner.line})
}
```

## Thiếu toán tử 3 ngôi (Ternary Operator)

Đa số các ngôn ngữ hiện nay đều implement toán tử này `a = con ? b : c`, tuy nhiên người viết ra golang cho rằng nó dễ bị lạm dụng để viết ra những thứ kiểu như:

![image.png](https://cdn.hashnode.com/res/hashnode/image/upload/v1617533485425/f9C55tPTu.png)

Thế nên golang đã không có ternary operator.

Hmmmh...., có thể chỉ giới hạn 1,2 lần nesting thôi mà nhỉ?

Trong "quyển" crafting interpreters, có một đoạn snippet Java của `Scanner` như thế này:
```java
      case '!':
        addToken(match('=') ? BANG_EQUAL : BANG);
        break;
```

Và trong go, mình phải implement chúng như thế này:

```go
	case "!":
		var tkShouldAdd tk.TokenType
		if scanner.match("=") {
			tkShouldAdd = tk.BANG_EQUAL
		} else {
			tkShouldAdd = tk.BANG
		}
		scanner.addToken(tkShouldAdd, struct{}{})
```

Cho **nhiều case khác nhau**, argggg ???

## Thiếu Generic

Cái này thì thôi, khỏi phải nói nhiều, tưởng tượng bạn phải implement hàm `sort` cho từng kiểu dữ liệu đi @@, are you fk kidding me?

<img src="https://cdn.hashnode.com/res/hashnode/image/upload/v1617534193503/TZP5va78d.png" style="display: block; margin: 0 auto;" />


Bạn cũng có thể workaround bằng cách nhét `interface {}` vào, và cũng giống như `as any` hay `void *`, nó kinda *xấu xí* và code có thể crash lúc runtime

![image.png](https://cdn.hashnode.com/res/hashnode/image/upload/v1617535459504/yodVBATbZD.png)


## Thiếu exception handling

Những ai quen `try`, `catch` rồi thì sẽ khá là khó chịu với kiểu error handling của golang, thay vì trả về kết quả thì hàm của bạn sẽ trả về tuple gồm hai giá trị là kết quả và lỗi nếu có. Kiểu như thế này: 

```go
err, value := foo();
if err != nil {
    // xử lý lỗi
}
```

Cũng không có gì to tát lắm, cho đến khi bạn cần gọi lần lượt 3 function cùng trả về tuple có lỗi, và nếu 1 function có lỗi thì return lỗi đó:

```go
func doSomething() (err, int) {
    err, value1 := someFunction();
    if err != nil {
            return err, nil
    }
    err, value2 := someFunction2(value1);
    if err != nil {
            return err, nil
    }
    err, value3 := someFunction3(value2);
    if err != nil {
            return err, nil
    }
    return value3;
}
```

Ewww... 

Còn nhiều thứ nữa để nói nữa, nhưng nhiêu đây là đủ để vứt cái project bằng golang đi và học rust rồi :)

Golang hướng tới sự đơn giản, dễ hiểu, hướng tới việc dễ code, dễ bảo trì. Tất nhiên sẽ có nhiều bài toán mà golang sẽ giải quyết tốt.

Và tất nhiên là cái gì *đẹp* sẽ *khó hiểu*.



*Bài viết có tham khảo một số nguồn linh tinh trên mạng*