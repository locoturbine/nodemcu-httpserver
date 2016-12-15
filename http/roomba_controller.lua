-- roomba_controller.lua
-- Part of nodemcu-httpserver, example.
-- Author: Federico Cia

local function sendCommand(connection, command)



    print('Configuring serial port to roomba.. ')
   

    uart.alt('1')
    uart.setup(0,115200,8,0,1)
    tmr.delay(200 * 1000) -- 1 seconds
    uart.write(0,128)
    tmr.delay(100 * 1000) -- 100 ms
    uart.write(0,131)
    tmr.delay(100 * 1000) -- 100 ms


   for str in string.gmatch(command, "([^,]+)") do
       uart.write(0,tonumber(str))
       tmr.delay(100 * 1000) -- 100 ms
   end
tmr.delay(100 * 1000)
    uart.alt(0)

    -- Send back JSON response.
    connection:send("HTTP/1.0 200 OK\r\nContent-Type: application/json\r\nCache-Control: private, no-store\r\n\r\n")
    connection:send('{"error":0, "message":"OK"}')

end

return function (connection, req, args)
    print('Sending command to roomba: ' .. args.command)
    if  args == nil or args.command == nil then
        connection:send("HTTP/1.0 400 OK\r\nContent-Type: application/json\r\nCache-Control: private, no-store\r\n\r\n")
        connection:send('{"error":-1, "message":"Bad command"}')
    else
        sendCommand(connection, args.command)   -- Start Command

    end
end
