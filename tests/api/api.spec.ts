import { test, expect } from "@playwright/test"

test('check api get all bookings', async ({ request }) => { //request là 1 context của test
    const response = await request.get('https://restful-booker.herokuapp.com/booking')
    console.log(await response.json())
    //Test API cần test: response trả về có ok không? 
    expect(response.ok()).toBeTruthy() //ok là 1 phương thức của response , toBeTruthy là 1 matcher( check response có trả về kqua? Đảm bảo rằng giá trị là true trong ngữ cảnh boolean, tức là bất kỳ giá trị nào ngoại trừ false, 0, '', null, undefined hoặc NaN. Hãy dùng phương thức này khi bạn không quan tâm đến giá trị cụ thể.)
    expect(response.status()).toBe(200) //status là 1 phương thức của response , check xem response có status là 200 không
    const responseBody = await response.json(); //chuyển từ array sang json, check xem response có body không, responseBody là 1 biến lưu trữ body của response
    expect(Array.isArray(responseBody)).toBeTruthy(); //check xem responseBody có phải là 1 array không
    expect(responseBody.length).toBeGreaterThan(0); //check xem responseBody có bị empty không?
})
test('check api get a booking by ID ', async ({ request }) => {
    const bookingID = 4870;
    const response = await request.get(`https://restful-booker.herokuapp.com/booking/${bookingID}`)
    console.log(await response.json())
    expect(response.ok()).toBeTruthy()
    expect(response.status()).toBe(200)
    const responseBody = await response.json();
    expect(responseBody).toHaveProperty('firstname', 'Trang'); // check xem data trả về có firstname= Trang ko
    expect(responseBody).toHaveProperty('lastname', 'Thu'); // check xem data trả về có lastname= Taylor ko
})
test('check api create a new booking by ID ', async ({ request }) => {
    const response = await request.post('https://restful-booker.herokuapp.com/booking', {
        data: {
            firstname: 'Trang',
            lastname: 'Thu',
            totalprice: 111,
            depositpaid: true,
            bookingdates: {
                checkin: '2024-01-01',
                checkout: '2024-01-05'
            },
            additionalneeds: 'nothing'
        }
    })
    // console.log(await response.json())
    expect(response.ok()).toBeTruthy()
    expect(response.status()).toBe(200)
    const responseBody = await response.json();
    expect(responseBody.bookingid).toBeDefined();
    expect(responseBody.booking).toHaveProperty('firstname', 'Trang');
    expect(responseBody.booking).toHaveProperty('lastname', 'Thu');
    expect(responseBody.booking).toHaveProperty('totalprice', 111);
    expect(responseBody.booking).toHaveProperty('depositpaid', true);
    expect(responseBody.booking).toHaveProperty('bookingdates.checkin', '2024-01-01');
    expect(responseBody.booking).toHaveProperty('bookingdates.checkout', '2024-01-05');
    expect(responseBody.booking).toHaveProperty('additionalneeds', 'nothing');
    console.log(await response.json())
});
test('check api update a booking by ID ', async ({ request }) => {
    //Tạo Auth - CreateToken
    let token = '' // tạo biến token = empty string
    const response = await request.post(`https://restful-booker.herokuapp.com/auth`, {
        data: {
            'username': 'admin',
            'password': 'password123'
        }
    })
    const authResponse = await response.json();
    token = authResponse.token;
    console.log(token);
    //Update Booking
    const updateResponse = await request.put(`https://restful-booker.herokuapp.com/booking/2104`,
        {
            headers: {
                'Content-type': 'application/json',
                'Accept': 'application/json',
                'Cookie': `token=${token}`
            }, data: {
                firstname: 'Trang',
                lastname: 'Taylor',
                totalprice: 115,
                depositpaid: false,
                bookingdates: {
                    checkin: '2024-01-01',
                    checkout: '2024-01-05'
                },
                additionalneeds: 'Breakfast2'
            }
        }

    )
    expect(updateResponse.ok()).toBeTruthy()
    expect(updateResponse.status()).toBe(200)
    const updateRequestBody = await updateResponse.json();
    expect(updateRequestBody).toHaveProperty('firstname', 'Trang');
    expect(updateRequestBody).toHaveProperty('lastname', 'Taylor');
    expect(updateRequestBody).toHaveProperty('totalprice', 115);
    expect(updateRequestBody).toHaveProperty('depositpaid', false);
    expect(updateRequestBody).toHaveProperty('bookingdates.checkin', '2024-01-01');
    expect(updateRequestBody).toHaveProperty('bookingdates.checkout', '2024-01-05');
    expect(updateRequestBody).toHaveProperty('additionalneeds', 'Breakfast2');
})
test('check api update a booking by ID with patch method', async ({ request }) => {
    //Tạo Auth - CreateToken
    let token = '' // tạo biến token = empty string
    const response = await request.post(`https://restful-booker.herokuapp.com/auth`, {
        data: {
            'username': 'admin',
            'password': 'password123'
        }
    })
    const authResponse = await response.json();
    token = authResponse.token;
    console.log(token);
    //Update Booking
    const updateResponse = await request.patch(`https://restful-booker.herokuapp.com/booking/4767`,
        {
            headers: {
                'Content-type': 'application/json',
                'Accept': 'application/json',
                'Cookie': `token=${token}`
            }, data: {
                totalprice: 113,

            }
        }

    )
    expect(updateResponse.ok()).toBeTruthy()
    expect(updateResponse.status()).toBe(200)
    const updateRequestBody = await updateResponse.json();
    expect(updateRequestBody).toHaveProperty('totalprice', 113);
})
test('check api delete a booking by ID', async ({ request }) => {
    //Tạo Auth - CreateToken
    let token = '' // tạo biến token = empty string
    const response = await request.post(`https://restful-booker.herokuapp.com/auth`, {
        data: {
            'username': 'admin',
            'password': 'password123'
        }
    })
    const authResponse = await response.json();
    token = authResponse.token;
    console.log(token);
    //Update Booking
    const deleteResponse = await request.delete(`https://restful-booker.herokuapp.com/booking/3731`,
        {
            headers: {
                'Content-type': 'application/json',
                'Accept': 'application/json',
                'Cookie': `token=${token}`
            }
        }

    )
    expect(deleteResponse.ok()).toBeTruthy()
    expect(deleteResponse.status()).toBe(201)
    //// verify bookingID đó đã xóa
    const getBookingResponse = await request.get(`https://restful-booker.herokuapp.com/booking/3731`)
    expect(getBookingResponse.status()).toBe(404)
})





// test.describe('api lesson', () => {
//     test.beforeEach('get an unique ID', async ({ request }) => {
//         const response = await request.get('https://restful-booker.herokuapp.com/booking')
//         const responseBody = await response.json();
//         const bookingId = responseBody[0].bookingID;
//         console.log(bookingId)
//     })
//     test('get booking by id', async ({ request }) => {
//         const response = await request.get(`https://restful-booker.herokuapp.com/booking/${bookingId}`)
//     })
// })