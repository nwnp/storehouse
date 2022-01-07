import time
start = time.time()

cnt=0
while True:
  cnt += 1
  if cnt > 100000000:
    break

end = time.time()
print(cnt)
print(end - start)