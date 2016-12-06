-- garage_door_opener.lua
-- Part of nodemcu-httpserver, example.
-- Author: Marcos Kirsch

local function sendCommand(connection, command)

-- Replace with serial communication to roomba

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
   print('Sending action to roomba: ', args.action)
   if     args.action == "start" then sendCommand(connection, 135)   -- Start Command
   elseif args.action == "stop" then sendCommand(connection, 131)   -- Stop Command
   else
      connection:send("HTTP/1.0 400 OK\r\nContent-Type: application/json\r\nCache-Control: private, no-store\r\n\r\n")
      connection:send('{"error":-1, "message":"Bad door"}')
   end
end
