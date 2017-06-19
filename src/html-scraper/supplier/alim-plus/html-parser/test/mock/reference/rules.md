1. remove spaces
2. if the value after the last digit is K or M
  Remove the value and save the value into the variable prefix.

3. Replace all occurrence by :
LB* -> LB
G* -> G
L* -> L
'* -> '

4. get the number of X :
if number of X == 0 :
  return "1X1X" + formatStr;
if number of X == 1 :
  return "1X" + formatStr;
if number of X == 2 :
  return formatStr;

Check value after digit if
LB = pound
' = feet
G* = gram
L* = liter
