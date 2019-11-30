#include <stdio.h>
#include <stdlib.h>
typedef struct Node{
	char data;
	struct Node *next;
} Node, *LinkList;

//Node��*LinkList��ؼ���typedef���ʹ�ã����������Ľṹ����һ������Node, ���ͬʱ��һ��ָ�����LinkList
//Node L;          //����һ��struct LNode�ͱ���L,�ȼ��� struct LNode L;
//LinkList Ptrl  //����һ��struct LNode* ��ָ�����Ptrl,�ȼ���д struct LNode *Ptrl

//ͷ�巨�������� 
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


//β�巨��������

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

//ɾ������

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

//��������

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

//��ȡ����ڵ��ֵ
 
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
 
//������� 

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



 

