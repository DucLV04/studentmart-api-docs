## 1. Kiểm tra API

Mở `GET /api/health` → **Try it out** → **Execute**.

Kết quả mong đợi:

```json
{
  "status": "ok",
  "service": "studentmart-api"
}
```

Bạn cũng có thể test `GET /api` để kiểm tra link Swagger.

## 2. Đăng ký tài khoản

Mở `POST /api/auth/register` → **Try it out** → nhập:

```json
{
  "name": "Nguyen Van A",
  "email": "nguyenvana@example.com",
  "password": "secret123"
}
```

Bấm **Execute**.

Response sẽ có:

```json
{
  "user": {
    "id": "...",
    "name": "Nguyen Van A",
    "email": "nguyenvana@example.com",
    "createdAt": "..."
  },
  "token": "..."
}
```

Copy giá trị `token`.

## 3. Đăng nhập

Mở `POST /api/auth/login` → **Try it out**:

```json
{
  "email": "nguyenvana@example.com",
  "password": "secret123"
}
```

Bấm **Execute**, copy `token` trong response.

> Lưu ý: response trả về field `token`, không phải `access_token`.

## 4. Authorize Swagger

Bấm nút **Authorize** ở phía trên trang Swagger.

Nhập:

```text
Bearer <token>
```

Ví dụ:

```text
Bearer eyJhbGciOiJIUzI1NiIs...
```

Bấm **Authorize** → **Close**.

Sau đó mọi endpoint có biểu tượng ổ khóa sẽ tự gửi JWT.

## 5. Kiểm tra tài khoản

Mở `GET /api/auth/me` → **Try it out** → **Execute**.

Kết quả mong đợi:

```json
{
  "user": {
    "id": "...",
    "name": "Nguyen Van A",
    "email": "nguyenvana@example.com",
    "createdAt": "..."
  }
}
```

## 6. Xem danh sách tin

Mở `GET /api/listings` → **Try it out** → **Execute**.

Có thể thử bộ lọc:

```text
q       = bàn
type    = SALE
category = Furniture
location = KTX
maxPrice = 300000
```

Tất cả tham số đều không bắt buộc.

Kết quả:

```json
{
  "data": [],
  "count": 0
}
```

## 7. Tạo tin đăng

Mở `POST /api/listings` → **Try it out**:

```json
{
  "title": "Bàn học gỗ nhỏ",
  "description": "Bàn học còn tốt, phù hợp phòng trọ",
  "type": "SALE",
  "category": "Furniture",
  "location": "KTX Khu B",
  "price": 250000
}
```

Bấm **Execute**. Cần có token đã Authorize, nếu không sẽ bị `403`.

Response có dạng:

```json
{
  "id": "...",
  "ownerId": "...",
  "title": "Bàn học gỗ nhỏ",
  "status": "OPEN"
}
```

Lưu lại `id` của tin đăng.

## 8. Xem chi tiết tin

Mở `GET /api/listings/{id}` → **Try it out**.

Nhập `id` vừa lưu, ví dụ:

```text
listing-id
```

Bấm **Execute**.

Endpoint này không yêu cầu đăng nhập.

## 9. Cập nhật tin

Mở `PATCH /api/listings/{id}` → **Try it out`.

Nhập cùng `id` của tin do tài khoản hiện tại tạo:

```json
{
  "title": "Bàn học gỗ nhỏ - đã giảm giá",
  "price": 200000,
  "status": "OPEN"
}
```

Chỉ chủ sở hữu mới cập nhật được. Nếu dùng tài khoản khác sẽ nhận `403`.

## 10. Xóa tin

Mở `DELETE /api/listings/{id}` → **Try it out**.

Nhập `id` tin của bạn → **Execute**.

Kết quả thành công thường là HTTP `200` với response rỗng.

## Lưu ý quan trọng

- Phải bấm **Authorize** trước khi gọi `/api/auth/me`, `POST /api/listings`, `PATCH` và `DELETE`.
- Dùng đúng field `token` từ response login/register.
- Các tin và tài khoản hiện đang lưu trong bộ nhớ của server; Render restart thì dữ liệu test có thể mất.
- Khi test lại sau khi server restart, hãy đăng ký tài khoản mới hoặc dùng tài khoản demo nếu dữ liệu demo còn tồn tại.