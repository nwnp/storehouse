list = ['python', 1, 2, 3, 4, 'last']

for i in list:
  print(i)

list.append(1234)
list.append(123422)

print(len(list))

list.extend([1,2,3,4,5])
print(list)