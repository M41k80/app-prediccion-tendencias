import pandas as pd

# cargar el dataset de productos
PRODUCTS_DF = pd.read_csv('ml_model/products.csv')
PRODUCTS_DF = PRODUCTS_DF.dropna()
PRODUCTS_DF.columns = PRODUCTS_DF.columns.str.strip()

print(PRODUCTS_DF.info())
print(PRODUCTS_DF['IsPerishable'].unique())
print(PRODUCTS_DF['IsSeasonal'].unique())
PRODUCTS_DF['Price'] = PRODUCTS_DF['Price'].astype(float)





# funcion para obtener el ProductID desde el ProductName
def get_product_id_from_name(product_name: str) -> str:
    product = PRODUCTS_DF[PRODUCTS_DF['ProductName'].str.lower() == product_name.lower()]
    if not product.empty:
        return product.iloc[0]['ProductID']
    else:
        raise ValueError(f"Producto '{product_name}' no encontrado.")

def get_product_category(product_name: str) -> str:
    product = PRODUCTS_DF[PRODUCTS_DF['ProductName'].str.lower() == product_name.lower()]
    if not product.empty:
        return product.iloc[0]['Category']
    else:
        return "Unknown"  
    

def get_all_products():
    unique_products = PRODUCTS_DF.drop_duplicates(subset='ProductName')
    sorted_products = unique_products.sort_values(by='ProductName')
    return sorted_products[['ProductID', 'ProductName', 'Category']].to_dict(orient="records")

print(get_product_category('Jugo Jumex Mango 1L'))  # Debería devolver 'Bebidas'
print(get_product_id_from_name('Jugo Jumex Mango 1L'))  # Debería devolver 'P0001'