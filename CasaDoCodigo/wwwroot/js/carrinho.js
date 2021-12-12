class Carrinho {
    clickIncremento(button) {
        let data = this.getData(button);
        data.Quantidade++;
        this.postQuantidade(data);
    }

    clickDecremento(btn) {
        let data = this.getData(button);
        data.Quantidade--;
        this.postQuantidade(button);
    }

    getData(elemento) {
        var linhaDoItem = $(elemento).parents('[item-id]');
        var itemId = $(linhaDoItem).attr('item-id');
        var novaQuantidade = $(linhaDoItem).find('input').val();

        return  {
            Id: itemId,
            Quantidade: novaQuantidade
        };
    }

    updateQuantidade(input) {
        let data = this.getData(input);
        this.postQuantidade(data);

    }

    postQuantidade(data) {
        let token = $('[__RequestVerificationToken]').val()
        let headers = {};
        headers = ['RequestVerificationToken']
        $.ajax({
            url: '/pedido/updatequantidade',
            type: 'POST',
            contentType: 'application/json',
            data: JSON.stringify(data),
            headers: headers

        }).done(function (response) {
            let itemPedido = response.itemPedido;
            let linhaDoItem = $('[item-id=' + itemPedido.id + ']')
            linhaDoItem.find('input').val(itemPedido.quantidade);
            linhaDoItem.find('[subtotal]').html((itemPedido.subtotal).duasCasa());
            let carrinhoViewModel = response.carrinhoViewModel;
            $('[numero-itens]').html('Total: ' + carrinhoViewModel.itens.length + ' itens');
           $('[total]').html((carrinhoViewModel.total).duasCasa());

            if (itemPedido.quantidade == 0) {
                linhaDoItem.remove();
            }           
        });
    }
}

var carrinho = new Carrinho();
Number.prototype.duasCasa = function () {
    return this.toFixed(2).replace('.', ',');
}

