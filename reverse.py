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

  def print_list(self):
    while self.head is not None:
      print(self.head.value)
      self.head = self.head.next

  def append(self, value):
    new_node = Node(value)
    if self.length == 0:
      self.head = new_node
      self.tail = new_node
    else:
       self.tail.next = new_node
       self.tail = new_node
    self.length += 1

  def reverse(self):
    temp = self.head
    self.head = self.tail
    self.tail = temp
    before = None
    after = temp.next
    for _ in range(self.length):
      after = temp.next
      temp.next = before
      before = temp
      temp = after

my_link_list = LinkList(1)
my_link_list.append(2)
my_link_list.append(3)
my_link_list.append(4)
my_link_list.print_list()
my_link_list.reverse()
my_link_list.print_list()


