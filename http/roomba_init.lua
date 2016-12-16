--
-- Created by IntelliJ IDEA.
-- User: fcia
-- Date: 12/15/16
-- Time: 6:00 PM
-- To change this template use File | Settings | File Templates.
--

function init()
    uart.alt('0');
    print('Configuring serial port to roomba.. ')
    uart.alt('1')
    uart.setup(0,115200,8,0,1)
    tmr.delay(200 * 1000) -- 1 seconds

end

return function (connection, req, args)
    init()
    connection:send("HTTP/1.0 200 OK\r\nContent-Type: application/json\r\nCache-Control: private, no-store\r\n\r\n")
    connection:send('{"error":0, "message":"OK"}')
end


