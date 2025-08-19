class Node:
  def __init__(self, value):
    self.value = value
    self.next = None

class LinkList:
  def __init__(self, value):
    new_node = Node(value)
    self.head = new_node
    self.tail = new_node
    self.length = 1
  
  def get(self, index):
    if index < 0 or index >= self.length:
       return None
    temp = self.head
    for _ in range(index):
      temp = temp.next
      return temp

  def set_value(self, index, value):
    temp = self.get(index)
    if temp:
      temp.value = value
      return True
    return False
   
my_link_list = LinkList(1)
print(my_link_list.set_value(0,3))