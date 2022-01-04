with open('object_detect/ssd_mobilenet_v2_320x320_coco17_tpu-8/mscoco_complete_label_map.pbtxt', 'rt') as f:
  pb_classes = f.read().rstrip('\n').split('\n')
  
  print(pb_classes[0])
  print(pb_classes[1])
  print(pb_classes[2])
  print(pb_classes[3])
  print(pb_classes[4])
  
  # for i in range(len(pb_classes)):
  #   print(pb_classes[i])
    
  print(len(pb_classes))