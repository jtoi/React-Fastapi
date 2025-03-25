'Para la entidad "plato de comida".'

export class Dish {
	constructor(id, name, description, price, category, escandalloId) {
	  this.id = id;
	  this.name = name;
	  this.description = description;
	  this.price = price;
	  this.category = category;
	  this.escandalloId = escandalloId;
	}
  
	// Métodos adicionales (opcional)
	// Por ejemplo, para formatear el precio o validar datos
  
	getFormattedPrice() {
	  return `$${this.price.toFixed(2)}`;
	}
  
	isValid() {
	  return this.name && this.price > 0;
	}
  }