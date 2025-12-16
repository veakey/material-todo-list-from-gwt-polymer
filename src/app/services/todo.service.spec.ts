import { TodoService } from './todo.service';

describe('TodoService', () => {
  let service: TodoService;

  beforeEach(() => {
    service = new TodoService();
  });

  it('ajoute un item', () => {
    service.add('Test');
    expect(service.items().length).toBe(1);
    expect(service.items()[0].title).toBe('Test');
  });

  it('toggle et clear done fonctionnent', () => {
    service.add('A');
    const id = service.items()[0].id;
    service.toggle(id);
    expect(service.items()[0].done).toBe(true);
    service.clearDone();
    expect(service.items().length).toBe(0);
  });

  it('clearAll vide la liste', () => {
    service.add('A');
    service.add('B');
    service.clearAll();
    expect(service.items().length).toBe(0);
  });
});

