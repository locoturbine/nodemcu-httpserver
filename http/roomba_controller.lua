-- garage_door_opener.lua
-- Part of nodemcu-httpserver, example.
-- Author: Marcos Kirsch

local function sendCommand(connection, command)

-- Replace with serial communication to roomba
    print('Configuring serial port to roomba.. ')
    uart.alt('1')
   uart.setup(0,115200,8,0,1)
   tmr.delay(200 * 1000) -- 1 seconds
   uart.write(0,128)
   tmr.delay(100 * 1000) -- 500 ms
   uart.write(0,131)
   tmr.delay(100 * 1000) -- 500 ms
   
   uart.write(0,command)
   uart.alt(0)
--    gpio.write(pin, gpio.LOW)
--    gpio.mode(pin, gpio.OUTPUT)
--    gpio.write(pin, gpio.LOW)
--    tmr.delay(300000) -- in microseconds
--    gpio.write(pin, gpio.HIGH)
--    gpio.mode(pin, gpio.INPUT)

   -- Send back JSON response.
   connection:send("HTTP/1.0 200 OK\r\nContent-Type: application/json\r\nCache-Control: private, no-store\r\n\r\n")
   connection:send('{"error":0, "message":"OK"}')

end

return function (connection, req, args)
   print('Sending command to roomba: ' .. args.command)
   if  args.command != nil  then 
        sendCommand(connection, args.command)   -- Start Command
--    elseif args.action == "stop" then sendCommand(connection, 128)   -- Stop Command
--    elseif args.action == "dock" then sendCommand(connection, 143)   -- Stop Command
--    elseif args.action == "spot" then sendCommand(connection, 134)   -- Stop Command
--    elseif args.action == "poweroff" then sendCommand(connection, 133)   -- Stop Command
   
--    elseif args.action == "forward" then sendCommand(connection, 134)   -- Stop Command
--    elseif args.action == "reverse" then sendCommand(connection, 134)   -- Stop Command
--    elseif args.action == "left" then sendCommand(connection, 134)   -- Stop Command
--    elseif args.action == "right" then sendCommand(connection, 134)   -- Stop Command
   
   else
      connection:send("HTTP/1.0 400 OK\r\nContent-Type: application/json\r\nCache-Control: private, no-store\r\n\r\n")
      connection:send('{"error":-1, "message":"Bad command"}')
   end
end
