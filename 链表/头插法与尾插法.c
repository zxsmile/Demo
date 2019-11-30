#include <stdio.h>
#include <stdlib.h>
typedef struct Node{
	char data;
	struct Node *next;
} Node, *LinkList;

//Node和*LinkList与关键字typedef配合使用，即给声明的结构体起一个别名Node, 与此同时起一个指针别名LinkList
//Node L;          //声明一个struct LNode型变量L,等价于 struct LNode L;
//LinkList Ptrl  //声明一个struct LNode* 型指针变量Ptrl,等价于写 struct LNode *Ptrl

//头插法创建链表 
//Node *CreatLinkHead(){
//	LinkList p L;
//	int i;
//	L=(LinkList)malloc(sizeof(Node));
//	L->next=NULL;
//	p=(LinkList)malloc(sizeof(Node));
//	scanf("%c",&p->data);
//	while(p->data!=0){
//		p->next=L->next;
//		L->next = p;
//        p=(LinkList)malloc(sizeof(Node));
//		scanf("%c",&p->data);
//	}
//	free(p); 
//	return L;
//}
//


//尾插法创建链表

Node *CreatLinkHead(){
   LinkList L,p1,p2;
   p2=L=(LinkList)malloc(sizeof(Node));
   p1=(LinkList)malloc(sizeof(Node));
   scanf("%c",&p1->data); 
   while(p1->data!='#'){
   	  p2->next=p1;
   	  p2=p1;
   	  p1=(LinkList)malloc(sizeof(Node));
      scanf("%c",&p1->data);
   }
   
   p2->next=NULL;
   free(p1);
   return L;
}

//删除链表

void DeleteLink(LinkList head,int i) {
	
	int j=1;
	char data;
	LinkList p,q;
	p=head;
	while(p->next&&j<i){
		p=p->next;
		j++;
	}
	
	if(!(p->next)||j>i){
		return "error";
	}
	
	q=p->next;
	data=q->data;
	p->next=q->next;
	return "ok";
	
}

//插入链表

void InsertList(LinkList head,int i,char data){
	
	LinkList p,q;
	int j=1;
	p=head;
	while(p->next&&j<i){
		p=p->next;
		j++;
	}
	
	if(!p||j>i){
		return "error";
	}
	
	q=(LinkList)malloc(sizeof(Node));
	q->data=data;
	q->next=p->next;
	p->next=q;
	return "ok";
}

//读取任意节点的值
 
 char GetLink(LinkList head,int i){
 	
 	LinkList p;
 	int j=1;
 	char data;
 	p=head->next;
 	while(p&&j<i){
 		p=p->next;
 		j++;
	 }
	 if(!p||j>i){
	 	return "error";
	 }
	 data = p->data;
	 return data;
	 
 }
 
//输出函数 

void print(LinkList head){
	 head =head->next;
	while(head!=NULL){
		printf("%c",head->data);
		head=head->next;
	} 
}
 
void main(){
	LinkList head;
	char InsertData = '1',GetData;
	head = CreatLinkHead();
    //print(head);
    //DeleteLink(head,2);
    //InsertList(head,5,InsertData);
     GetData=GetLink(head,2);
     printf("%c\n",GetData);
     print(head);
	
}



 

