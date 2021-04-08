---
title: Bài toán Halting là cái của nợ gì?
date: '2021-04-07'
spoiler: Chắc hẳn bạn đã nghe đến khái niệm này?
cta: 'computer-science'
---

Bài toán Halting là một trong những vấn đề kinh điển nhất của ngành Khoa học máy tính.

Khi người ta bắt đầu có những ý tưởng *sơ yếu* nhất về một chiếc máy tính (A.K.A Turing Machine), người ta đã đặt ra câu hỏi:

> Liệu máy tính có thể làm tất cả mọi thứ?

Câu hỏi này mang tính bao quát rất cao, **mọi thứ** ở đây, theo nghĩa đen, chính là **mọi thứ**, mọi vấn đề 😫

> Liệu chúng ta có thể viết ra chương trình để giải quyết tất cả các vấn đề hay không?

Bài toán Halting, chính là một vấn đề và máy tính không thể nào giải được.

Đái khái như sau 😉 :

Liệu có thể xác định được: với 2 đầu vào - một **chương trình** và một **đầu vào** cho chương trình đó, liệu chúng ta có thể xác định được chương trình đó có **đưa ra kết quả** (dừng, hay "halt") hay không? 

Để dễ hiểu hơn, giả sử tồn tại một chương trình có thể giải quyết bài toán này, chúng ta có nghĩ nó như một chiếc hộp như thế này:

![image.png](https://cdn.hashnode.com/res/hashnode/image/upload/v1617808891707/-67WQlp3T.png)

Ta đặt tên chiếc hộp này là `H`

Từ chiếc hộp này, chúng ta có thể thêm mắm thêm muối vào để tạo ra một chiếc hộp khác:


![image.png](https://cdn.hashnode.com/res/hashnode/image/upload/v1617809488766/QqtiLfs9f.png)

Chiếc này nhận một đầu vào, lấy đầu vào đó và chuyền vào chiếc hộp `H`, nếu `H` cho ra kết quả có, nó sẽ tự lặp **vô hạn** và **không bao giờ cho cho ra kết quả**, hay không bao giờ "halt", nếu chiếc hộp `H` cho ra kết quả không, nó sẽ **đưa ra kết quả đó** hay **dừng**.

Chúng ta đặt tên chiếc hộp này là `H+`

Điều gì xảy ra nếu chúng ta cho vào đầu vào của `H+` chính `H+` 🤔 ?

*Mọi việc bắt đầu nhì nhằng ở đây*

Việc này tương đương với chúng ta hỏi `H` câu hỏi: 

Nếu cho đầu vào `H+` vào chương trình `H+`, thì `H+` có dừng không 🤔 ?

Nếu `H` cho ra kết quả là **có dừng**, thì nó sẽ vào đi vào cái hộp `lặp` và không bao giờ dùng lại, vậy `H+` sẽ **không dừng** với đầu vào `H+` ???

Nếu `H` cho ra kết quả **không dừng**, thì nó sẽ đi ra ngoài và chương trình sẽ **dừng lại** ???

Một đoạn code JS để mô tả lại quá trình trên:

```jsx
function h(func, input) {
    var halt;
    // Do some calculation to determine whether func(input) will halt
    // ...
    return halt;
}

function hPlus(func) {
    if (h(func, func) == true) {
        while (true) {}
    }
    else return false;
}

var foo = hPlus(hPlus);
```

Rõ ràng đây là một nghịch lý, do vậy không thể tồn tại `H`, hay không thể tồn tại chương trình sẽ giải quyết được bài toán Halting, hay, máy tính không thể làm được tất cả mọi :v 

Cảm ơn đã đọc bài, chúc bạn buổi tối vui vẻ :v
